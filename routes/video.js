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
    Video.find({ creatorId: userId }, (err, videos) => {
        if (err) { return next(err); }
        
        res.render('myVideos', { videos: videos });

    })
})


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

router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
   console.log(id)
  
    Video.findByIdAndRemove(id, (err, product) => {
      if (err){ return next(err); }
      return res.redirect('/');
    });
  });
  


module.exports = router;
