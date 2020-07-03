import crypto from 'crypto';
import { insertUser, findUserByEmail, dropUser } from '../models/userModel.js';

export async function registerUser(req, res) {
    const isUserRegistered = findUserByEmail(req.body.email);

    if (isUserRegistered) {
        return res.status(409).json({ message: 'email is already associated with an account' });
    } else {
        const salt = crypto.randomBytes(16).toString('base64');
        const hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');

        req.body.password = `${salt}${hash}`;
        req.body.salt = salt;

        try {
            const document = await insertUser(req.body);
            res.status(201).send({ id: document._id });
        } catch (error) {
            res.status(400);
        }
    }
}

export async function logInUser(req, res) {
    const user = await findUserByEmail(req.body.email);
    const { password, salt } = user;

    if (!user) {
        return res.status(401).json({ message: 'auth failed' });
    } else {
        const isPasswordValid =
            password ===
            salt + crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'auth failed' });
        } else {
            return res.status(201).json({ message: 'auth succeeded' });
        }
    }
}

export async function deleteUser(req, res) {
    console.log('delete user');
    try {
        await dropUser({ _id: req.params.id });
        res.status(200).json({ message: 'user deleted' });
    } catch (error) {
        res.status(500).json({ error });
    }
}
