var express = require('express'),
    router  = express.Router(),
    User    = require('../models/user.js');

// define routes
router.get('/new', function (req, res) {
  res.render('users/new');
});

router.get('/login', function (req, res, next) {
  res.render('users/login', {
    userId: req.session.userId || "guest",
    userName: req.session.userName || "Guest"
  }
);
});

// user show page
router.get('/:id', function (req, res) {
  if (req.session.userId) {
    User.findById(req.params.id, function (err, user) {
      if (err) {
        req.session.flash.message = "An error has occurred: " + err;
        res.redirect(302, '/');
      } else if (user) {
        res.render('users/show', {
          user: user,
          userId: req.session.userId || "guest",
          userName: req.session.userName || "Guest"
        });
      } else {
        res.redirect(302, '/');
      }
    });
  } else {
    req.session.flash.message = "You must be logged in to see this.";
    res.redirect(302, '/users/login');
  }
});

// user edit page
router.get('/:id/edit', function (req, res) {
  if (req.session.userId === req.params.id) {
    User.findById(req.params.id, function (err, user) {
      if (err) {
        req.session.flash.message = "An error has occurred: " + err;
        res.redirect(302, '/');
      } else if (user) {
        res.render('users/edit', {
          user: user,
          userId: req.session.userId || "guest",
          userName: req.session.userName || "Guest"
        });
      } else {
        res.redirect(302, '/');
      }
    });
  } else if (req.session.userId) {
    req.session.flash.message = "You cannot edit another user's profile.";
    res.redirect(302, '/users/' + req.session.userId);
  } else {
    req.session.flash.message = "You must be logged in to edit your profile.";
    res.redirect(302, '/users/login');
  }
});

// user index page
router.get('/', function (req, res) {
  if (!req.session.userId) {
    res.redirect(302, '/users/login');
  } else {User.find({}, function (err, allUsersArray) {
    if (err) {
      console.log("Retrieval error: ", err);
    } else {
      res.render('users/index', {
        users: allUsersArray,
        userId: req.session.userId || "guest",
        userName: req.session.userName || "Guest"
      });
    }
  });
}
});

router.post('/', function (req, res) {
  var userParams = req.body.user;

  if (!userParams.email) {
    req.session.flash.message = "Email cannot be empty.";
    res.redirect(302, '/users/new');
  } else if (!userParams.name) {
    req.session.flash.message = "Name cannot be empty.";
    res.redirect(302, '/users/new');
  } else if (!userParams.password) {
    req.session.flash.message = "Password cannot be empty.";
    res.redirect(302, '/users/new');
  } else if (!userParams.passwordVerification) {
    req.session.flash.message = "You have to verify. I know, I know...";
    res.redirect(302, '/users/new');
  } else if (passwordIsVerified(userParams)) {
    delete userParams.passwordVerification;

    User.findOrCreateByEmail(userParams, function (err, user) {
      if (err) {
        console.log(err);
        req.session.flash.message = "Some error has occurred.";
        res.redirect(302, '/users/new');
      } else {
        req.session.flash.message = "Sign up successful!";
        req.session.userId = user._id;
        // could also use user name
        res.redirect(302, '/users/' + user._id);
      }
    });
  } else {
    req.session.flash.message = "Password and verification must match.";
    res.redirect(302, '/users/new');
  }
});

function passwordIsVerified (userParams) {
  return !!userParams.password &&
         (userParams.password === userParams.passwordVerification);
}

// export router
module.exports = router;
