import express from 'express';
import { insertUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/users', insertUser);

export default router;
