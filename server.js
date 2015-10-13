    /* import necessary libraries */
var mongoose = require('mongoose'),
    server   = require('./lib/create-server')(),
    /* set universal variables, required for Heroku to work */
    PORT     = process.env.PORT || 1337,
    MONGOURI = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
    dbname   = "funke_wiki";

/* include routers for specific routes. Are the .js file extensions necesary? */
server.use('/session', require('./controllers/session.js'));
server.use('/users', require('./controllers/users.js'));
server.use('/articles', require('./controllers/articles.js'));

/* define default welcome page route */
server.get('/', function (req, res) {
  if (req.session.userId) {
    console.log(req.session);
    res.redirect(302, '/articles');
  } else {
    console.log(req.session);
    res.render('welcome',
    { userId: req.session.userId || "guest",
      userName: req.session.userName || "Guest"
    });
  }
  res.end();
});

/* start it up */
mongoose.connect(MONGOURI + "/" + dbname);
server.listen(PORT, function () {
  console.log("Server is up on port: ", PORT);
});
