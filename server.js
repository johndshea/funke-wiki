/* import necessary libraries */
var mongoose = require('mongoose'),
    server   = require('./lib/create-server')(),
    /* set universal constants */
    PORT     = process.env.PORT || 1337,
    MONGOURI = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
    dbname   = "funke_wiki";

/* include routers for specific routes */
server.use('/session', require('./controllers/session'));
server.use('/users', require('./controllers/users'));
server.use('/articles', require('./controllers/articles'));

/* define other routes */
server.get('/', function (req, res) {
  res.render('welcome');
  res.end();
});

/* spin it up */
mongoose.connect(MONGOURI + "/" + dbname);
server.listen(PORT, function () {
  console.log("Server us up on port: ", PORT);
});
