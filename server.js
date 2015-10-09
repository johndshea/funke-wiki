var express = require(express);
    // required for heroku to work
    PORT    = process.env.PORT || 1337;
    server  = express();

server.get('/', function (req, res, next) {
  res.write("Welcome to my amazing app");
  res.end();
});

server.listen(PORT, function () {
  console.log("Server us up on port: ", PORT)
});
