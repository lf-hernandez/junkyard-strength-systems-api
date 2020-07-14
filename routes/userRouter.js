import express from 'express';
const router = express.Router();

import { onGetAll, onGet, onPatch, onUpdate, onDelete } from '../controllers/userController.js';

router.get('/', onGetAll); // santi: good idea to not have a post here and instead use authRouter/signup for that
router.get('/:id', onGet);
router.patch('/:id', onPatch); // santi: this is cool, support for both patch and put
router.put('/:id', onUpdate);
router.delete('/:id', onDelete);

export default router; // santi: exported as router, but file is called userRouter, consider renaming file to router.js
