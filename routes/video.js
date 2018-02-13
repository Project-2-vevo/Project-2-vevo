const express = require('express')
const Video = require("../models/Videos");
const router = express.Router();
const User = require("../models/User");


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


/* CRUD -> READ DETAIL */
router.get('/myvideos/:id', (req, res) => {
    const userId = req.params.id;
    // console.log(req)
    Video.find({ creatorId: userId }, (err, videos) => {
        if (err) { return next(err); }
        console.log({ videos })
        res.render('myVideos', { videos: videos });

    })
})
// router.get("/myvideos/:id", (req, res, next) => {
//     res.render("detail");
// });

// router.post('/myvideos/:id', (req, res, next) => {
//     const userId = req.params.id;
//     console.log(userId)
//     Video.find({ creatorId: userId }, (err, videos) => {
//         if (err) { return next(err); }
//         res.render("myVideos", { videos: videos })
//     })
// })

module.exports = router;
