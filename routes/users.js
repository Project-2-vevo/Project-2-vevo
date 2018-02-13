var express = require('express')
const User = require("../models/User");
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* CRUD -> READ DETAIL */
router.get('/detail/:id', (req, res) => {
  const userId = req.params.id;
  console.log(userId)

  User.findById(userId, (err, user) => {
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
    res.render('editUser')
  })
})

router.post('/detail/:id/edit', (req, res) => {
  const userId = req.params.id;
  const username = req.body.username;
  console.log(req.body)
  const updates = {username:req.body.username };
  
  User.findByIdAndUpdate(userId, updates, (err, user) => {
    if (err) {
      return next(err);
    }
    res.render("editUser")
  })
})


module.exports = router;
