import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const Model = mongoose.model;

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
    },
    password: {
        type: String,
        required: true
    }
};

const options = {
    timestamps: true
};

const userSchema = new Schema(keys, options);
const userModel = new Model('user', userSchema);

export async function createUser(payload) {
    const user = new userModel(payload);
    await user.save();
}

export default userModel;
