export function onSuccess(res, message) {
    const body = {
        message
    };
    return res.status(200).json(body);
}

export function onSuccessWithToken(res, token, message) {
    const body = {
        message,
        token
    };
    return res.status(200).json(body);
}

export function onCreated(res, message, payload) {
    const body = {
        message,
        data: payload
    };

    return res.status(201).json(body);
}

export function onBadRequest(res, message) {
    const body = {
        message
    };

    return res.status(400).json(body);
}

export function onUnauthorized(res, message) {
    const body = {
        message
    };

    return res.status(401).json(body);
}

export function onNotFound(res, message) {
    const body = {
        message
    };

    return res.status(404).json(body);
}

export function onConflict(res, message) {
    const body = {
        message
    };

    return res.status(409).json(body);
}

export function onError(res, message) {
    const body = {
        message
    };

    return res.status(500).json(body);
}
