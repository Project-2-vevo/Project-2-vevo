const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: String,
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }, videoId: {
        type: Schema.Types.ObjectId,
        ref: 'Video',
    }
})


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
