/* need to include mongoose to use it */
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/* define the schema */
var articleSchema = new Schema({
  title:  String,
  author:   String,
  content: String,
  // need to find a way to ingest this data and interpret it into an array instead
  // look at dating app for code you wrote before
  tags: String
});

/* make the model */
var Article = mongoose.model('Article', articleSchema);

/* export the model */
module.exports = Article;
