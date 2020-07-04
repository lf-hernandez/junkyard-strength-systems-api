import crypto from 'crypto';
import { dropUser, findUserByEmail, insertUser } from '../models/userModel.js';
import {
    onBadRequest,
    onConflict,
    onCreated,
    onError,
    onSuccess,
    onUnauthorized
} from '../helpers/responseHelper.js';

export async function registerUser(req, res) {
    const isUserRegistered = await findUserByEmail(req.body.email);

    if (isUserRegistered) {
        return onConflict(res, 'email is already associated with an account');
    } else {
        const salt = crypto.randomBytes(16).toString('base64');
        const hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');

        req.body.password = `${salt}${hash}`;
        req.body.salt = salt;

        try {
            const document = await insertUser(req.body);
            return onCreated(res, 'success', { id: document._id });
        } catch (error) {
            return onBadRequest;
        }
    }
}

export async function logInUser(req, res) {
    const user = await findUserByEmail(req.body.email);
    const { password, salt } = user;

    if (!user) {
        return onUnauthorized(res, 'auth failed');
    } else {
        const isPasswordValid =
            password ===
            salt + crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');

        if (!isPasswordValid) {
            return onUnauthorized(res, 'auth failed');
        } else {
            return onSuccess(res, 'auth succeeded');
        }
    }
}

export async function deleteUser(req, res) {
    try {
        await dropUser({ _id: req.params.id });
        return onSuccess(res, 'user deleted');
    } catch (error) {
        return onError(res, error);
    }
}
