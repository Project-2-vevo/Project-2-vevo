const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    name: String,
    link: String,
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
})


const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
