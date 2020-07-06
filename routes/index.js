import express from 'express';
const router = express.Router();

import authRouter from './authRouter.js';
import clientsRouter from './clientsRouter.js';
import userRouter from './userRouter.js';

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/clients', clientsRouter);

export default router;
