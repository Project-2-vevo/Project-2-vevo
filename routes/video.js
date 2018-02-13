const express = require('express')
const Video = require("../models/Videos");
const router = express.Router();
const User = require("../models/User");
const Comentario = require("../models/Comment");

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


/* CRUD -> READ DETAIL */
router.get('/myvideos/:id', (req, res) => {
    const userId = req.params.id;
    Video.find({ creatorId: userId }, (err, videos) => {
        if (err) { return next(err); }

        res.render('myVideos', { videos: videos });

    })
})
//Detail of any video
router.get('/detail-video/:id', (req, res) => {
    const videoId = req.params.id;
    Video.findOne({ _id: videoId }, (err, video) => {
        if (err) { return next(err); }
        res.render('detail-video', { video: video }, );


    })

})//CREO QUE NO SE PUEDEN HACER 2 GETS DE LA MISMA PÁGINA

// router.get('/detail-video/:id', (req, res) => {
//     const videoId = req.params.id;
//     console.log(videoId)
//     Comentario.find({ _id: videoId }, (err, comentario) => {
//         if (err) { return next(err); }
//         console.log("This is "+comentario)
//         res.render('detail-video', { comentario: comentario }, );


//     })

// })

//Create new Video
router.post('/myvideos/:id', (req, res, next) => {
    const userId = req.params.id;
    const link = req.body.link;
    const name = req.body.name;

    Video.findOne({ creatorId: userId }, (err, videos) => {
        if (err) { return next(err); }
        const newVideo = new Video({
            name,
            link,
            creatorId: userId
        })
        newVideo.save((err) => {
            if (err) {
                res.render("myVideos", { message: "Something went wrong" });
            } else {
                res.redirect("/");
            }
        })
    });
})
//Delete video
router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    console.log(id)

    Video.findByIdAndRemove(id, (err, product) => {
        if (err) { return next(err); }
        return res.redirect('/');
    });
});



module.exports = router;
