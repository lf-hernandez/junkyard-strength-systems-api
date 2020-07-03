import express from 'express';
const router = express.Router();

import { registerUser, logInUser, deleteUser } from '../controllers/userController.js';

router.post('/auth/signup', registerUser);
router.post('/auth/login', logInUser);
router.delete('/users/:id', deleteUser);

export default router;
