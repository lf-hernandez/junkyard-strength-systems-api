import mongoose from 'mongoose';
const connect = mongoose.connect;

import dbConfig from '../config/dbConfig.js';

mongoose.Promise = global.Promise;

const mongoDev = `mongodb://${dbConfig.devDbUser}:${dbConfig.devDbPw}@${dbConfig.devDbServer}:${dbConfig.devDbPort}/${dbConfig.devDb}`;
const mongoProd = '';
let dbUri = '';

console.log(`process.env.DATA_OPTION=${process.env.DATA_OPTION}`);
if (process.env.DATA_OPTION === 'dev') {
    dbUri = mongoDev;
} else {
    dbUri = mongoProd;
}
console.log(`Database URI: ${dbUri}`);

async function connectWithRetry() {
    mongoose.set('debug', true);
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

export function connectDb() {
    connectWithRetry();
}

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection is disconnected due to application termination');
        process.exit(0);
    });
});
