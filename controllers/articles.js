/* << controllers/articles.js >>
  Include this controller with: server.use('/articles', articleRouter);
  Every route below will be prefaced with '/articles'
*/

var express   = require('express'),
    router    = express.Router(),
    marked    = require('marked'),
    Article   = require('../models/article.js');
    User      = require('../models/user.js');

// INDEX
router.get('/', function (req, res) {
  if (!req.session.userId) {
    res.redirect(302, '/users/login');
  } else {
    Article.find({}, function (err, allArticlesArray) {
      if (err) {
        console.log("Retrieval error: ", err);
      } else {
        res.render('articles/index', {
          articles: allArticlesArray,
          userId: req.session.userId || "guest",
          userName: req.session.userName || "Guest"
        });
      }
    });
  }
});

// NEW
router.get('/new', function (req, res) {
  if (req.session.userId) {
    User.findById(req.session.userId, function (err, user) {
      if (err) {
        req.session.flash.message = "An error has occurred: " + err;
        res.redirect(302, '/');
      } else if (user) {
        res.render('articles/new', {
          user: user,
          userId: req.session.userId || "guest",
          userName: req.session.userName || "Guest"
        });
      }
    });
  } else {
    res.redirect(302, '/users/login');
  }
});

// CREATE
router.post('/', function (req, res) {
  console.log(req.body);
  if (!req.session.userId) {
    res.redirect(302, '/users/login');
  } else {
    var articleOptions = req.body.article;
    articleOptions.tags = articleOptions.tags.split(/,\s?/);
    articleOptions.authorId = req.session.userId;
    articleOptions.authorName = req.session.userName;
    var newArticle = new Article(articleOptions);

    newArticle.save(newArticle, function (err, addedArticle) {
      if (err) {
        console.log("There was a database error: ", err);
        res.redirect(302, '/articles/new');
      } else {
        console.log("Article added to database: " + addedArticle);
        res.redirect(302, '/articles');
      }
    });
  }
});

// SHOW
router.get('/:id', function (req, res) {
  if (!req.session.userId) {
    res.redirect(302, '/users/login');
  } else {
    Article.findById(req.params.id, function (err, specificArticle) {
      	if (err) {
        		console.log("Retrieval error: ", err);
     		} else {
        		res.render('articles/show', {
          		article: specificArticle,
              content: marked(specificArticle.content),
              userId: req.session.userId || "guest",
              userName: req.session.userName || "Guest"
        		});
  	      }
    	});
  }
});

// EDIT
router.get('/:id/edit', function (req, res) {
  if (!req.session.userId) {
    res.redirect(302, '/users/login');
  } else {
    Article.findById(req.params.id, function (err, specificArticle) {
      	if (err) {
        		console.log("Retrieval error: ", err);
     		} else {
        		res.render('articles/edit', {
          		article: specificArticle,
              userId: req.session.userId || "guest",
              userName: req.session.userName || "guest"
        		});
  	      }
    	});
  }
});



// UPDATE
router.patch('/:id', function (req, res) {
  if (!req.session.userId) {
    res.redirect(302, '/users/login');
  } else {
    var articleOptions = req.body.article;
    Article.findByIdAndUpdate(req.params.id, articleOptions, function (err, updatedArticle) {
      if (err) {
        console.log("update error: ", err);
      } else {
        res.redirect(302, "/articles/" + updatedArticle._id);
      }
    });
  }
});

// DELETE
router.delete('/:id', function (req, res) {
  if (!req.session.userId) {
    res.redirect(302, '/users/login');
  } else {
    Article.findByIdAndRemove(req.params.id, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Article has been removed from database");
        res.redirect(302, '/articles');
      }
    });
  }
});

module.exports = router;
