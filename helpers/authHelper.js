import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export function generateSaltHash(password) {
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.createHmac('sha512', salt).update(password).digest('base64');
    const saltHash = salt + hash;

    return { salt, saltHash };
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
