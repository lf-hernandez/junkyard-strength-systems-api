import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const Model = mongoose.model;

const keys = {
    name: {
        type: String,
        required: true
    },
    movementType: {
        type: String,
        required: true
    },
    muscles: {
        type: Array,
        required: true
    },
    description: String
};
const options = {
    timestamps: true
};

const exerciseSchema = new Schema(keys, options);
const exerciseModel = new Model('exercise', exerciseSchema);

export default exerciseModel;
