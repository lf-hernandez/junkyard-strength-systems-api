import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';

import { connectDb } from './services/dbService.js';
import router from './routes/index.js';

const port = process.env.PORT || 3000;

const app = express();

connectDb();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(helmet());

app.use(compression());

app.use('/api', router);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
