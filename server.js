var express = require(express);
    // required for heroku to work
    PORT    = process.env.PORT || 1337,
    server  = express(),
    MONGOURI = process.env.MONGOLAB_URI,
    // change this db name later
    dbname = "project_two",
    mongoose= require('mongoose');

server.get('/', function (req, res) {
  res.write("Welcome to my amazing app");
  res.end();
});

mongoose.connect(MONGOURI + / + dbname);
server.listen(PORT, function () {
  console.log("Server us up on port: ", PORT);
});
