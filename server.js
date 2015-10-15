    /* import necessary libraries */
var mongoose = require('mongoose'),
    marked   = require('marked'),
    server   = require('./lib/create-server')(),
    /* set universal variables, required for Heroku to work */
    PORT     = process.env.PORT || 1337,
    MONGOURI = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
    dbname   = "funke_wiki";

server.use(function(req, res, next) {
  res.locals.requested = req.originalUrl;
  res.locals.marked = marked;
  res.locals.userId = req.session.userId || "guest";
  res.locals.userName = req.session.userName || "Guest";
  next();
});

/* include routers for specific routes. Are the .js file extensions necesary? */
server.use('/session', require('./controllers/session.js'));
server.use('/users', require('./controllers/users.js'));
server.use('/articles', require('./controllers/articles.js'));

/* define default welcome page route */
/* redefine your routes so that you only check for userId once and not on every single route every time */
server.get('/', function (req, res) {
  if (req.session.userId) {
    res.redirect(302, '/articles');
  } else {
    res.render('welcome');
  }
  res.end();
});

/* start it up */
mongoose.connect(MONGOURI + "/" + dbname);
server.listen(PORT, function () {
  console.log("Server is up on port: ", PORT);
});
