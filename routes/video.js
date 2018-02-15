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

// /* CRUD -> READ ALL */
// router.get('/', (req, res, next) => {
//     Product.find().exec((err, products) => {
//       res.render('products/index', {
//         products: products
//       });
//     });
//   });
  
//Detail of any video
router.get('/detail-video/:id', (req, res) => {
    const videoId = req.params.id;
    console.log(videoId)

    Video.findOne({ _id: videoId }).populate({ path: 'comments', populate: { path: 'authorId' } }).then((video) => {
        console.log(typeof(video.comments))
        res.render('detail-video', { video: video });
    })

})

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
            console.log(newCom._id)
            console.log(videoId)

            Video.findByIdAndUpdate(
                { _id: videoId },
                { $push: { comments: newCom._id } },
                { new: true })

                .then((videoUpdated) => {
                    console.log(videoUpdated)
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


    Video.findByIdAndRemove(id, (err) => {
        if (err) { return next(err); }
        return res.redirect('/');
    });
});



module.exports = router;
