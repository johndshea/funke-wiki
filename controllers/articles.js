/* << controllers/articles.js >>
  Include this controller with: server.use('/articles', articleRouter);
  Every route below will be prefaced with '/articles'
*/

var express = require('express'),
    router  = express.Router(),
    Article = require('../models/article.js');

// INDEX
router.get('/', function (req, res) {
  Article.find({}, function (err, allArticles) {
    res.render('articles/index', {
      articles: allArticles
    });
  });
});

// NEW
router.get('/new', function (req, res) {
  res.render('articles/new');
});

// CREATE
router.post('/', function (req, res) {
  console.log(req.body);
  Article.new(req.body.article, function (err, newArticle) {
    if (err) {
      res.redirect(302, '/articles/new');
    } else {
      res.redirect(302, '/articles');
    }
  });
});

// SHOW
router.get('/:id', function (req, res) {
  //  show page
});

// EDIT
router.get('/:id/edit', function (req, res) {
  //  edit FORM page
});

// UPDATE
router.patch('/:id', function (req, res) {
  //  update action + REDIRECT
});

// DELETE
router.delete('/:id', function (req, res) {
  //  delete action + REDIRECT
});

module.exports = router;
