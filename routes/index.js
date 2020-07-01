import express from 'express';
const router = express.Router();

import clientsRouter from './clientsRoutes.js';

router.use('/', clientsRouter);

export default router;
