const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: String,
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
})


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
