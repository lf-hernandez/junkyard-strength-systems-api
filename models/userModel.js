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
        unique: true,
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
    const document = await user.save().exec();

    return document;
}

export async function findUserByEmail(email) {
    const user = await userModel.findOne({ email: email }).exec();
    return user;
}

export async function dropUser(id) {
    const options = { useFindAndModify: false };
    return await userModel.findByIdAndDelete({ _id: id }, options).exec();
}

export async function partialUpdate(id, partial) {
    const options = { new: true, useFindAndModify: false };
    return await userModel
        .findByIdAndUpdate(id, partial, options, (error, document) => {
            return document;
        })
        .exec();
}

export async function fullUpdate(id, user) {
    const options = { new: true, useFindAndModify: false };
    return await userModel.findByIdAndReplace(id, user, options).exec();
}
