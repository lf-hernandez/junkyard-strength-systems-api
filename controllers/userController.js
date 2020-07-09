import {
    dropUser,
    findUserByEmail,
    fullUpdate,
    partialUpdate,
    getAllUsers,
    getUser
} from '../models/userModel.js';
import {
    onConflict,
    onCreated,
    onError,
    onSuccessWithPayload,
    onUnauthorized
} from '../helpers/responseHelper.js';
import { registerUser, authenticateUser } from '../helpers/authHelper.js';

export async function onSignUp(req, res) {
    const isUserRegistered = await findUserByEmail(req.body.email);
    if (isUserRegistered) {
        return onConflict(res, 'Email is already associated with an existing account');
    } else {
        const registeredUser = await registerUser(req, res);
        res.location(`${req.baseUrl}/users/${registeredUser.id}`);
        return onCreated(res, 'success', { id: registeredUser._id });
    }
}

export async function onLogIn(req, res) {
    const user = await findUserByEmail(req.body.email);
    if (user) {
        const authenticatedUser = authenticateUser(user, req, res);
        return onSuccessWithPayload(res, authenticatedUser, 'auth succeeded');
    } else {
        return onUnauthorized(res, 'Bad credentials');
    }
}

export async function onDelete(req, res) {
    try {
        const droppedUser = await dropUser({ _id: req.params.id });
        return onSuccessWithPayload(res, droppedUser, 'User deleted');
    } catch (error) {
        return onError(res, error);
    }
}

export async function onPatch(req, res) {
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

export async function onUpdate(req, res) {
    try {
        const updatedUser = await fullUpdate(req.params.id, req.body.user);
        return onSuccessWithPayload(res, updatedUser, 'User updated');
    } catch (error) {
        return onError(res, error);
    }
}

export async function onGetAll(req, res) {
    try {
        const users = await getAllUsers();
        return onSuccessWithPayload(res, users);
    } catch (error) {
        return onError(res, error);
    }
}

export async function onGet(req, res) {
    try {
        const user = await getUser(req.params.id);
        return onSuccessWithPayload(res, user);
    } catch (error) {
        return onError(res, error);
    }
}
