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
          articles: allArticlesArray
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
          user: user
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
    articleOptions.published.tags = articleOptions.published.tags.split(/,\s?/);
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
              content: marked(specificArticle.published.content)
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
          		article: specificArticle
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
    var newEdit = req.body.article;
    newEdit.tags = newEdit.tags.split(/,\s?/);
    newEdit.last_edited = new Date();
    newEdit.editorId = req.session.userId;
    newEdit.editorName = req.session.userName;
    Article.findById(req.params.id, function (err, foundArticle) {
      if (req.session.userId == foundArticle.authorId) {
        Article.findByIdAndUpdate(req.params.id, {published: newEdit, $push: {history: foundArticle.published}}, function (err, updatedArticle) {
          if (err) {
            console.log("update error: ", err);
          } else {
            res.redirect(302, "/articles/" + updatedArticle._id);
            console.log("article successfully updated");
          }
        });
      } else {
        Article.findByIdAndUpdate(req.params.id, {$push: {drafts: newEdit}}, function (err, updatedArticle) {
          if (err) {
            console.log("update error: ", err);
          } else {
            res.redirect(302, "/articles/" + updatedArticle._id);
            console.log("article successfully updated");
          }
        });
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

// Delete a specific draft of an article.
router.delete('/drafts/delete/:articleId/:draftId', function (req, res) {
  console.log("attempted to delete draft " + req.params.draftId + " , of Article " + req.params.articleId );
  Article.findById(req.params.articleId,
  function (err, foundArticle) {
    if (err) {
      console.log(err);
    } else {
      var remove = foundArticle.drafts.id(req.params.draftId).remove();
      foundArticle.save(function (err) {
        if (err) return handleError(err);
        console.log('the draft was removed');
      });
      res.redirect(302, '/articles/' + req.params.articleId);
    }
  });
});

// Upvote a specific draft of an article.
// consider http://stackoverflow.com/questions/8987372/incrementing-a-value-with-mongoose
router.patch('/drafts/upvote/:articleId/:draftId', function (req, res) {
  console.log("attempted to upvote draft " + req.params.draftId + " , of Article " + req.params.articleId );
  Article.findById(req.params.articleId,
  function (err, foundArticle) {
    if (err) {
      console.log(err);
    } else {
      // var upvote = foundArticle.drafts.id(req.params.draftId).upvotes;
      foundArticle.save(function (err) {
        if (err) return handleError(err);
        console.log('the draft was upvoted');
      });
      res.redirect(302, '/articles/' + req.params.articleId);
    }
  });
});

module.exports = router;
