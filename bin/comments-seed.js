const mongoose = require('mongoose');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Video = require('../models/Videos');
const { dbURL } = require("../config");
mongoose.connect(dbURL).then(() => console.log("conectado"));


const newComment = new Comment({
    content: 'Great Video',
    authorId: '5a81ea5c1aedf13b424ce7fb',

})
newComment.save((err, user) => {
    if (err) {
        throw err;
    }
    console.log("Comment saved")
})
Comment.collection.drop();
