/* need to include mongoose to use it */
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/* define the schema */
var articleSchema = new Schema({
  title:  String,
  authorId: String,
  authorName:   String,
  content: String,
  tags: Array,
  drafts: Array,
  history: Array,
  // right now, this sets the date once when the article is created and never
  // updates it. I need to figure out a way to have it reset with each edit.
  // Try looking at the http://www.w3schools.com/js/js_dates.asp page.
  date_created: { type : Date, default: Date.now },
  last_edited: Date
});

/* make the model */
var Article = mongoose.model('Article', articleSchema);

/* export the model */
module.exports = Article;
