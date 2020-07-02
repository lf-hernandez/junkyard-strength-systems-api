import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index.js';

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', router);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
