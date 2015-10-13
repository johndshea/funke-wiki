var express = require('express'),
    router  = express.Router(),
    bcrypt = require('bcrypt'),
    User    = require('../models/user');

router.post('/', function (req, res) {
  var attempt = req.body.user;

  User.findOne({email: attempt.email}, function (err, user) {
    if (err) {
      req.session.flash.message = "Some error has occurred.";
      res.redirect(302, 'users/login');
    } else if (user && user.password == attempt.password) {
      req.session.userId = user._id;
      req.session.userName = user.name;
      req.session.flash.message = "Thanks for signing in.";
      res.redirect(302, 'articles');
    } else if (user) {
      req.session.flash.message = "Wrong Password";
      res.redirect(302, 'users/login');
    } else {
      req.session.flash.message = "Email and password combination does not exist / match.";
      res.redirect(302, 'users/login');
    }
  });
});

router.delete('/', function (req, res) {
  delete req.session.userId;
  delete req.session.userName;
  req.session.flash.message = "Thanks for signing out.";
  res.redirect(302, '/');
});

module.exports = router;

// using users/login route in place of session/new route. More intuitive for user.
