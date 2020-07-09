import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Model = mongoose.Model;

const keys = {
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
    phone: String,
    checkInDates: Array
};

const options = {
    timestamps: true
};

const clientSchema = new Schema(keys, options);
const clientModel = new Model('client', clientSchema);

export default clientModel;

export async function getAllClients() {
    const clients = await clientModel.find().exec();
    return clients;
}

export async function getClient(id) {
    const client = await clientModel.findById(id).exec();
    return client;
}

export async function insertClient(payload) {
    const client = new clientModel(payload);
    client._id = new mongoose.Types.ObjectId();
    const document = await client.save();
    return document;
}

export async function updateClient(id, partial) {
    const options = { new: true, useFindAndModify: false };
    return await clientModel.findByIdAndUpdate(id, partial, options).exec();
}

export async function dropClient(id) {
    const options = { useFindAndModify: false };
    return await clientModel.findByAndDelete({ _id: id }, options).exec();
}
