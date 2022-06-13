import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: {type: mongoose.SchemaTypes.ObjectId, ref: "User", required:true},
    plant: {type: mongoose.SchemaTypes.ObjectId, ref: "Plant", required:true},
    care : {type: String, enum:['HIGH','MEDIUM','LOW']},
    irrigation : {type: Number, enum:[1, 2, 3]},
    light: {type: Boolean},
    description: {type: String}
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;