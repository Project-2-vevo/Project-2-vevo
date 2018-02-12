var express = require('express')
const Video = require("../models/Videos");
var router = express.Router();
const User = require("../models/User");


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* CRUD -> READ DETAIL */
router.get('/myvideos/:id', (req, res) => {
    const userId = req.params.id;
    User.findById(userId, (err, videos) => {
        if (err) { return next(err); }
        res.render('myVideos', { videos: videos });

    })
})
module.exports = router;
