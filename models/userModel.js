import { Model, Schema } from 'mongoose';

const keys = {
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
};

const options = {
    timestamps: true
};

const userSchema = new Schema(keys, options);
const userModel = new Model('user', userSchema);

export default userModel;
