import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import router from './routes/index.js';

const port = process.env.PORT || 3000;

const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PW}@ds129651.mlab.com:29651/jss`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', router);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
