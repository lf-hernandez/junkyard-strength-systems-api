import express from 'express';
const router = express.Router();

import clientsRouter from './clientsRouter.js';
import userRouter from './userRouter.js';

router.use('/', userRouter);
router.use('/clients/', clientsRouter);

export default router;
