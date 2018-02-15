require('dotenv').load()
const mongoose = require('mongoose');
const User = require('../models/User');
const Video = require('../models/Videos');
const { dbURL } = require("../config");
mongoose.connect(dbURL).then(() => console.log("conectado"));

const usuario = new User({
    username: "Prueba Seeds",
    email: "seed@mail.com",
    password: "jaja",
    profile_pic: {
       
        pic_path: "https://vignette.wikia.nocookie.net/lossimpson/images/9/9d/Maggie_Simpson.png/revision/latest?cb=20100529224628&path-prefix=es",


        pic_name: "Profile Picture",


    }
});
usuario.save((err, user) => {
    if (err) {
        throw err;
    }
    console.log("user saved1")
})
User.collection.drop()