/* << controllers/articles.js >>
  Include this controller with: server.use('/articles', articleRouter);
  Every route below will be prefaced with '/articles'
*/

var express = require('express'),
    router  = express.Router(),
    Article = require('../models/article.js');

// INDEX
router.get('/', function (req, res) {
  Article.find({}, function (err, allArticlesArray) {
    if (err) {
      console.log("Retrieval error: ", err);
    } else {
      res.render('articles/index', {
        articles: allArticlesArray
      });
    }
  });
});

// NEW
router.get('/new', function (req, res) {
  res.render('articles/new');
});

// CREATE
router.post('/', function (req, res) {
  console.log(req.body);
  var newArticle = new Article(req.body.article);
  newArticle.save(newArticle, function (err, addedArticle) {
    if (err) {
      console.log("There was a database error: ", err);
      res.redirect(302, '/articles/new');
    } else {
      console.log("Article added to database: " + newEntry);
      res.redirect(302, '/articles');
    }
  });
});

// SHOW
router.get('/:id', function (req, res) {
  Article.findById(req.params.id, function (err, specificArticle) {
    	if (err) {
      		console.log("Retrieval error: ", err);
   		} else {
      		res.render('articles/show', {
        		article: specificArticle
      		});
	      }
  	});
});

// EDIT
router.get('/:id/edit', function (req, res) {
  Article.findById(req.params.id, function (err, specificArticle) {
    	if (err) {
      		console.log("Retrieval error: ", err);
   		} else {
      		res.render('articles/edit', {
        		article: specificArticle
      		});
	      }
  	});
});



// UPDATE
router.patch('/:id', function (req, res) {
  var articleOptions = req.body.article;
  Article.findByIdAndUpdate(req.params.id, articleOptions, function (err, updatedArticle) {
    if (err) {
      console.log("update error: ", err);
    } else {
      res.redirect(302, "/articles/" + updatedArticle._id);
    }
  });
});

// DELETE
router.delete('/:id', function (req, res) {
  Article.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Article has been removed from database");
      res.redirect(302, '/articles');
    }
  });
});

module.exports = router;
