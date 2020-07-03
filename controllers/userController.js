import { createUser } from '../models/userModel.js';
import crypto from 'crypto';

export async function insertUser(req, res) {
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');

    req.body.password = `${salt}${hash}`;

    try {
        const document = await createUser(req.body);
        res.status(201).send({ id: document._id });
    } catch (error) {
        res.status(400);
    }
}
