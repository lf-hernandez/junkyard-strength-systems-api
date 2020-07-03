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
