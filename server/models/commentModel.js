import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: {type: mongoose.SchemaTypes.ObjectId, ref: "User", required:true},
    plant: {type: mongoose.SchemaTypes.ObjectId, ref: "Plant", required:true},
    content: {type: String, required:true}
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;