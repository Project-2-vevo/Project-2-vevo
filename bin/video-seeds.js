require('dotenv').load()
const mongoose = require('mongoose');
const Video = require('../models/Videos');

const { dbURL } = require("../config");
mongoose.connect(dbURL).then(() => console.log("conectado"));


const newVideo = new Video({
    name: "Fixihan - Mis Líricas ((Official Video))",
    link: "https://www.youtube.com/watch?v=yaiG3lWymqw",
    creatorId: "5a81ea691aedf13b424ce7fc"
});
newVideo.save((err, user) => {
    if (err) {
        throw err;
    }
    console.log("Video saved1")


});
const newVideo2 = new Video({
    name: "MARTESTRECE (El Onírico) - SATÁN",
    link: "https://www.youtube.com/watch?v=Jj6Km4beFhU",
    creatorId: "5a81ea741aedf13b424ce7fd"
});
newVideo2.save((err, user) => {
    if (err) {
        throw err;
    }
    console.log("Video saved2")
    
    
});
const newVideo3 = new Video({
    name: "Deeplime - Malditos por el siglo",
    link: "https://www.youtube.com/watch?v=esVpQLJYXUc",
    creatorId: "5a81ea691aedf13b424ce7fc",
    comments:"5a831db2775eee498091db34"
});
newVideo3.save((err, user) => {
    if (err) {
        throw err;
    }
    console.log("Video saved3")
    
    
});

Video.collection.drop();
