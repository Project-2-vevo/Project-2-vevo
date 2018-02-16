const express = require('express')
const User = require("../models/User");
const router = express.Router();
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
  User.findById(userId, (err, img) => {
    if (req.file === undefined) {
      
      a = img.picture;
    } else {
      
      a = `../uploads/${req.file.filename}`;
    }
    let updates = {
      username : req.body.username,
      email:req.body.email,
      picture: a
    };

    User.findByIdAndUpdate(userId, updates, (err, user) => {
     if (err) {
      return next(err);
      } 
      console.log("Hola"+updates.picture)
      res.redirect(`/user/detail/${userId}`)
    
    });
  });
});


module.exports = router;