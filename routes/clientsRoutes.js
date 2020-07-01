import express from 'express';
const router = express.Router();

router.get('/clients', (req, res) => res.send('responding to GET /clients'));

export default router;
