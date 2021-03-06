const express = require('express')
const Video = require("../models/Videos");
const router = express.Router();
const User = require("../models/User");
const Comentario = require("../models/Comment");

router.get('/', (req, res, next) => {
    res.send('respond with a resource');
});

router.get("/list",(req,res) =>{
   Video.find().populate("creatorId")
   .then(videos => res.render('videos/list', {videos: videos}))
   .catch()
})
/* CRUD -> READ DETAIL */
router.get('/myvideos/:id', (req, res) => {
    const userId = req.params.id;
    Video.find({ creatorId: userId }, (err, video) => {
        if (err) { return next(err); }

        res.render('myVideos', { video: video });

    })
})  
//Detail of any video
router.get('/detail-video/:id', (req, res) => {
    const videoId = req.params.id;

    Video.findOne({ _id: videoId }).populate({ path: 'comments', populate: { path: 'authorId' } }).then((video) => {
        res.render('detail-video', { video: video });
    })

})
//post new comments
router.post('/detail-video/:id', (req, res) => {
    const videoId = req.params.id
    const userId = req.user._id
    const content = req.body.content

    new Comentario({
        content,
        authorId: userId,
        videoId
    })
        .save()
        .then((newCom) => {

            Video.findByIdAndUpdate(
                { _id: videoId },
                { $push: { comments: newCom._id } },
                { new: true })

                .then((videoUpdated) => {
                    res.redirect(`/video/detail-video/${videoId}`);
                })
        })
})


//Create new Video

router.post('/myvideos/:id', (req, res, next) => {
    const userId = req.params.id;
    const link = req.body.link;
    const name = req.body.name;
    const comments = []
    Video.findOne({ creatorId: userId }, (err) => {
        if (err) { return next(err); }
        const newVideo = new Video({
            name,
            link,
            creatorId: userId,
            comments
        })
        newVideo.save((err) => {
            if (err) {
                res.render("myVideos", { message: "Something went wrong" });
            } else {
                res.redirect("/video/list");
            }
        })
    });
})
//Delete video
router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    const userId = req.user._id
    Video.findByIdAndRemove(id, (err) => {
        if (err) { return next(err); }
        return res.redirect(`/video/myvideos/${userId}`);
    });
});

//Delete comment
router.post('/delete-comment/:id', (req, res) => {
    const commentId = req.params.id;
    const videoId = req.body.videoId;
    const userId = req.user._id;
    
    Comentario.findByIdAndRemove(commentId, (err) => {
        if (err) { return next(err); }
        return res.redirect(`/video/detail-video/${videoId}`);
    });
})

module.exports = router;
