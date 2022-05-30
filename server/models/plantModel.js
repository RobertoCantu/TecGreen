import mongoose from "mongoose";

const Schema = mongoose.Schema;

const plantSchema = new Schema({
    commonName: {type: String, required: true},
    scientificName: {type: String},
    flowers: {type: Boolean, required: true},
    seeds: {type: Boolean, required: true},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

const Plant = mongoose.model('Plant', plantSchema);

export default Plant;