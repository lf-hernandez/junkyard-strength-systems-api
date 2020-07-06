import express from 'express';
const router = express.Router();

import { onSignUp, onLogIn } from '../controllers/userController.js';

router.post('/signup', onSignUp);
router.post('/login', onLogIn);

export default router;
