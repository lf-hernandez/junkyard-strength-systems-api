import crypto from 'crypto';

export function generateSaltHash(password) {
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.createHmac('sha512', salt).update(password).digest('base64');
    const saltHash = salt + hash;

    return { salt, saltHash };
}

export function validatePassword(userModel, req) {
    const { password, salt } = userModel;

    return (
        password ===
        salt + crypto.createHmac('sha512', salt).update(req.body.password).digest('base64')
    );
}
