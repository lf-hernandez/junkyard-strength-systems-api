// santi: nice work here on these functions using correct http return codes
export function onSuccess(res, message) {
    const body = {
        message
    };
    return res.status(200).json(body);
}

export function onSuccessWithPayload(res, payload, message) {
    const body = {
        message,
        payload
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
