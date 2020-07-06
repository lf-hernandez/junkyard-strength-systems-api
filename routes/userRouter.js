import express from 'express';
const router = express.Router();

import { userDeletion, userPatch, userUpdate } from '../controllers/userController.js';

router.delete('/:id', userDeletion);
router.patch('/:id', userPatch);
router.put('/:id', userUpdate);

export default router;
