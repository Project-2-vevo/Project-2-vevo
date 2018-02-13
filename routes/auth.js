const express = require("express");
const authRoutes = express.Router();
const path = require('path');
const multer = require('multer');
const bcrypt = require("bcrypt");
const passport = require('passport')
const User = require("../models/User");
const bcryptSalt = 10;

const myUploader = multer({
    dest: path.join(__dirname, '../public/uploads')
  });
  

authRoutes.get("/signup", (req, res, next) => {
    res.render("auth/signup");
});

authRoutes.post("/signup", (req, res, next) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    console.log("hola")

    if (username === "" || password === "") {
        res.render("auth/signup", { message: "Indicate username and password" });
        return;
    } else if (email === "") {
        res.render("auth/signup", { message: "Indicate an email please" });
        return;
    }

    User.findOne({ username }, "username", (err, user) => {
        if (user !== null) {
            res.render("auth/signup", { message: "The username already exists" });
            return;
        }

        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);

        const newUser = new User({
            email,
            username,
            password: hashPass,
            // profile_pic: {
            //     pic_path: `/uploads/${req.file.filename}`,
            //     pic_name: req.body.name
            // }
        });

        newUser.save((err) => {
            if (err) {
                res.render("auth/signup", { message: "Something went wrong" });
            } else {
                res.redirect("/");
            }
        });
    });
});


authRoutes.get("/login", (req, res, next) => {
    res.render("auth/login");
});

authRoutes.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login"
}));


               
//   Review.find({user:userId}, (err,reviews) =>{ 
    //     let num_stars = reviews.reduce((acc,e) => acc+e.stars,0);
 
  
  
  /* CRUD -> UPDATE FORM */
//   authRoutes.get('/onlyMe/:id/edit', (req,res) => {
//     const userId = req.params.id;
//     User.findById(userId, (err, product) => {
//       if (err) { return next(err); }
//       res.render('detail', { user: user });
//     }); 
//   })
  
  
//   /* CRUD -> UPDATE DATABASE */
//   authRoutes.post('/onlyMe/:id/edit', (req,res) => {
//     const productId = req.params.id;
//     const {name,price,imageUrl,description} = req.body;
//     const updates = {name,price,imageUrl,description};
  
//     Product.findByIdAndUpdate(productId, updates, (err, product) => {
//       if (err){ return next(err); }
//       return res.redirect('/');
//     });
//   })
  





authRoutes.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = authRoutes;