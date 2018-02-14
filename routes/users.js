var express = require('express')
const User = require("../models/User");

var router = express.Router();
const multer = require('multer')
const upload = multer({dest: __dirname + "/../uploads"});
/* GET users listing. */
router.get('/', function (req, res, next) {
  
  res.send('respond with a resource');
});

/* CRUD -> READ DETAIL */
router.get('/detail/:id', (req, res) => {
  const userId = req.params.id;


  User.findById(userId, (err, user, next) => {
    if (err) {
      return next(err);
    }
    res.render('detail', {
      user: user
    });
  })
});

router.get('/detail/:id/edit', (req, res) => {
  const userId = req.params.id;

  User.findById(userId, (err, user) => {
    if (err) {
      return next(err);
    }
    res.render('editUser');

  })
})

router.post('/detail/:id/edit', upload.single('picture'), (req, res) => {
  const userId = req.params.id;
  const username = req.body.username;
  const email = req.body.email;
  const image = req.file.filename
  
  // const default = req.file.filename;
  const updates = {
    username: username,
    email: email,
    picture: image
    // imageUrl: imageUrl
    // default: default
  };
 

  User.findByIdAndUpdate(userId, updates, (err, user) => {
    if (err) {
      return next(err);
    }
 
  
    res.redirect(`/user/detail/${userId}`)
    // res.redirect("/user/detail/"+userId)
  })
})


module.exports = router;
