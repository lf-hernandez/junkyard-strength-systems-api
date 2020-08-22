import { getAllClients, getClient, insertClient } from '../models/clientModel.js';
import { onError, onSuccessWithPayload } from '../helpers/responseHelper.js';

export async function onGetAll(req, res) {
    try {
        const clients = await getAllClients();
        return onSuccessWithPayload(res, clients);
    } catch (error) {
        return onError(res, error);
    }
}

export async function onGet(req, res) {
    try {
        const client = await getClient(req.params.id);
        return onSuccessWithPayload(res, client);
    } catch (error) {
        return onError(res, error);
    }
}

export async function onPost(req, res) {
    try {
        const client = await insertClient(req.body);
        return onSuccessWithPayload(res, client);
    } catch (error) {
        return onError(res, error);
    }
}
