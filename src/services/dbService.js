import mongoose from 'mongoose';
const connect = mongoose.connect;

import dbConfig from '../config/dbConfig.js';

mongoose.Promise = global.Promise;

const mongoDev = `mongodb://${dbConfig.devDbUser}:${dbConfig.devDbPw}@${dbConfig.devDbServer}:${dbConfig.devDbPort}/${dbConfig.devDb}`;
const mongoProd = '';

let dbUri = '';

async function connectWithRetry(env) {
    if (env === 'DEVELOPMENT') {
        mongoose.set('debug', true);
        dbUri = mongoDev;
    } else {
        dbUri = mongoProd;
    }

    console.log(`Database URI: ${dbUri}`);

    try {
        await connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('MongoDB connection successful');
    } catch (err) {
        console.log('MongoDB connection unsuccessful, retry after 5 seconds.', err);
        setTimeout(connectWithRetry, 5000);
    }
}

export async function connectDb(env) {
    await connectWithRetry(env);
}

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection is disconnected due to application termination');
        process.exit(0);
    });
});
