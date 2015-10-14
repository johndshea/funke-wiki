var express = require('express'),
    router  = express.Router(),
    bcrypt  = require('bcrypt'),
    marked  = require('marked'),
    User    = require('../models/user.js');

  router.use(function(req, res, next) {
    res.locals.marked = marked;
    res.locals.userId = req.session.userId || "guest";
    res.locals.userName = req.session.userName || "Guest";
    next();
  });

// define routes
router.get('/new', function (req, res) {
  res.render('users/new', {
    // userId: req.session.userId || "guest",
    // userName: req.session.userName || "Guest"
  });
});

router.get('/login', function (req, res, next) {
  res.render('users/login', {
    // userId: req.session.userId || "guest",
    // userName: req.session.userName || "Guest"
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
          // userId: req.session.userId || "guest",
          // userName: req.session.userName || "Guest"
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
          // userId: req.session.userId || "guest",
          // userName: req.session.userName || "Guest"
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
        // userId: req.session.userId || "guest",
        // userName: req.session.userName || "Guest"
      });
    }
  });
}
});

// CREATE new user
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

    User.findOne({ email: userParams.email }, function (err, user) {
      if (err) {
        console.log(err);
      } else if (user) {
        req.session.flash.message = "Email is already in use";
        res.redirect(302, '/users/new');
      } else {
        bcrypt.genSalt(10, function (saltErr, salt) {
          bcrypt.hash(userParams.password, salt, function (hashErr, hash) {
            var newUser = new User({
              email: userParams.email,
              name: userParams.name,
              passwordDigest: hash // note, replace password w/ passwordDigest in schema
            });

            newUser.save(function (saveErr, savedUser) {
              if (saveErr) {
                console.log(err);
              } else {
                req.session.userId = savedUser._id;
                req.session.userName = savedUser.name;
                res.redirect(302, '/articles');
              }
            });
          });
        });
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

// UPDATE
router.patch('/:id', function (req, res) {
  if (!req.session.userId) {
    res.redirect(302, '/users/login');
  } else if (req.session.userId == req.params.id) {
    var userOptions = req.body.user;
    User.findByIdAndUpdate(req.params.id, userOptions, function (err, updatedUser) {
      if (err) {
        console.log("update error: ", err);
      } else {
        req.session.userName = req.body.user.name;
        console.log(req.session);
        res.redirect(302, "/users/" + updatedUser._id);
      }
    });
  } else {
    req.session.flash.message = "You cannot edit someone else's profile";
    res.redirect(302, '/users/' + req.params.id);
  }
});

// export router
module.exports = router;

// CODE BELOW CREATES USERS WITHOUT HASHING PASSWORDS
// User.findOrCreateByEmail(userParams, function (err, user) {
//   if (err) {
//     console.log(err);
//     req.session.flash.message = "Some error has occurred.";
//     res.redirect(302, '/users/new');
//   } else {
//     req.session.flash.message = "Sign up successful!";
//     req.session.userId = user._id;
//     // could also use user name
//     res.redirect(302, '/users/' + user._id);
//   }
// });
