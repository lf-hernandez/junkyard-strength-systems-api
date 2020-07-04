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
    },
    salt: {
        type: String,
        required: true
    }
};

const options = {
    timestamps: true
};

const userSchema = new Schema(keys, options);
const userModel = new Model('user', userSchema);

export async function insertUser(payload) {
    const user = new userModel(payload);
    user._id = new mongoose.Types.ObjectId();
    const document = await user.save();

    return document;
}

export async function findUserByEmail(email) {
    const user = await userModel.findOne({ email: email });
    return user;
}

export async function dropUser(id) {
    return await userModel.deleteOne({ _id: id });
}
