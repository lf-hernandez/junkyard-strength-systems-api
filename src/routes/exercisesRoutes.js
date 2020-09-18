import express from 'express';
const router = express.Router();

import { onGetAll, onGet, onPatch, onUpdate, onDelete } from '../controllers/userController.js';

router.get('/', onGetAll);
router.get('/:id', onGet);
router.patch('/:id', onPatch);
router.put('/:id', onUpdate);
router.delete('/:id', onDelete);

export default router;
