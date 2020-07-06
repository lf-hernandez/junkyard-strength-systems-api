import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import {
    onCreated,
    onSuccessWithPayload,
    onBadRequest,
    onUnauthorized,
    onError
} from './responseHelper.js';
import { insertUser } from '../models/userModel';

export async function registerUser(req, res) {
    const { salt, saltHash } = generateSaltHash(req.body.password);

    req.body.password = saltHash;
    req.body.salt = salt;

    try {
        const document = await insertUser(req.body);
        res.location(`${req.baseURL}/${document.id}`);

        return onCreated(res, 'success', { id: document._id });
    } catch (error) {
        return onBadRequest;
    }
}

export function generateSaltHash(password) {
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.createHmac('sha512', salt).update(password).digest('base64');
    const saltHash = salt + hash;

    return { salt, saltHash };
}

export function authenticateUser(user, req, res) {
    const isPasswordValid = validatePassword(user, req);

    if (!isPasswordValid) {
        return onUnauthorized(res, 'auth failed');
    } else {
        try {
            const token = getJWT(user._id, user.email);
            return onSuccessWithPayload(res, token, 'auth succeeded');
        } catch (error) {
            return onError(res, error);
        }
    }
}

export function validatePassword(userModel, req) {
    const { password, salt } = userModel;
    console.log(salt);

    return (
        password ===
        salt + crypto.createHmac('sha512', salt).update(req.body.password).digest('base64')
    );
}

export function getJWT(id, email) {
    const payload = { id, email };
    const options = { expiresIn: '1h' };
    console.log(process.env.JWT_SECRET);
    return jwt.sign(payload, process.env.JWT_SECRET, options);
}
