import express from 'express';
const router = express.Router();

import {
    userAuthentication,
    userDeletion,
    userRegistration
} from '../controllers/userController.js';

router.post('/auth/signup', userRegistration);
router.post('/auth/login', userAuthentication);
router.delete('/users/:id', userDeletion);

export default router;
