import express from 'express';
const router = express.Router();

import clientsRouter from './clientsRoutes.js';
import userRouter from './userRoutes.js';

router.use('/', clientsRouter);
router.use('/', userRouter);

export default router;
