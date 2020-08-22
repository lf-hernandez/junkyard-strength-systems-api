import mongoose from 'mongoose';
const connect = mongoose.connect;

import dbConfig from '../config/dbConfig.js';

import chalk from 'chalk';

const onConnect = chalk.bold.green;
const onError = chalk.bold.red;
const onDisconnect = chalk.bold.green;
const onTerminate = chalk.bold.magenta;

mongoose.Promise = global.Promise;

const mongoDev = `mongodb://${dbConfig.devDbUser}:${dbConfig.devDbPw}@${dbConfig.devDbServer}:${dbConfig.devDbPort}/${dbConfig.devDb}`;
const mongoProd = '';

let dbUri = '';

function connectWithRetry(env) {
    if (env === 'DEVELOPMENT') {
        mongoose.set('debug', true);
        dbUri = mongoDev;
    } else {
        dbUri = mongoProd;
    }

    try {
        connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        mongoose.connection.on('connected', function () {
            console.log(onConnect('Mongoose connection is open on', dbUri));
        });
    } catch (err) {
        console.log(onError('MongoDB connection unsuccessful, retry after 5 seconds.', err));
        setTimeout(connectWithRetry, 5000);
    }

    mongoose.connection.on('disconnected', function () {
        console.log(onDisconnect('Mongoose default connection is disconnected'));
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log(
                onTerminate(
                    'Mongoose default connection is disconnected due to application termination'
                )
            );
            process.exit(0);
        });
    });
}

export function connectDb(env) {
    connectWithRetry(env);
}
