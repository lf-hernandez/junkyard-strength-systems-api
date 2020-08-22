import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';

import { connectDb } from './services/dbService.js';
import router from './routes/index.js';

export function start() {
    const port = process.env.PORT;
    const environment = process.env.NODE_ENV;

    if (!environment || !port) {
        console.error('Environment variables are missing');
        process.exit(1);
    } else {
        console.log(`Starting ${environment} environment`);
    }

    const app = express();

    connectDb(environment);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(helmet());

    app.use(compression());

    app.use('/api', router);

    app.listen(port, () => console.log(`listening on http://localhost:${port}`));
}
