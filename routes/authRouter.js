import express from 'express';
const router = express.Router();

import { userAuthentication, userRegistration } from '../controllers/userController.js';

router.post('/signup', userRegistration);
router.post('/login', userAuthentication);

export default router;
