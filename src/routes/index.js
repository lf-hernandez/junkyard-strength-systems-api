import express from 'express';
const router = express.Router();

import authRouter from './authRoutes.js';
import clientsRouter from './clientsRoutes.js';
import usersRouter from './usersRoutes.js';
import exercisesRouter from './exercisesRoutes.js';

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/clients', clientsRouter);
router.use('/exercises', exercisesRouter);

export default router;
