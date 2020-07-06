import { dropUser, findUserByEmail, fullUpdate, partialUpdate } from '../models/userModel.js';
import {
    onConflict,
    onError,
    onSuccessWithPayload,
    onUnauthorized
} from '../helpers/responseHelper.js';
import { registerUser, authenticateUser } from '../helpers/authHelper.js';

export async function userRegistration(req, res) {
    const isUserRegistered = await findUserByEmail(req.body.email);

    if (isUserRegistered) {
        return onConflict(res, 'Email is already associated with an existing account');
    } else {
        const registeredUser = await registerUser(req, res);
        return registeredUser;
    }
}

export async function userAuthentication(req, res) {
    const user = await findUserByEmail(req.body.email);

    if (user) {
        const authenticatedUser = authenticateUser(user, req, res);
        return authenticatedUser;
    } else {
        return onUnauthorized(res, 'Bad credentials');
    }
}

export async function userDeletion(req, res) {
    try {
        const droppedUser = await dropUser({ _id: req.params.id });
        return onSuccessWithPayload(res, droppedUser, 'User deleted');
    } catch (error) {
        return onError(res, error);
    }
}

export async function userPatch(req, res) {
    if (req.body.op === 'replace') {
        try {
            const partial = { [req.body.path]: req.body.value };
            const updatedUser = await partialUpdate(req.params.id, partial);
            return onSuccessWithPayload(res, updatedUser, 'User patched');
        } catch (error) {
            return onError(res, error);
        }
    }
}

export async function userUpdate(req, res) {
    try {
        const updatedUser = await fullUpdate(req.params.id, req.body.updatedUser);
        return onSuccessWithPayload(res, updatedUser, 'User updated');
    } catch (error) {
        return onError(res, error);
    }
}
