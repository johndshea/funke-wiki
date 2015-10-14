/* need to include mongoose to use it */
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/* define the schema */
var articleSchema = new Schema({
  authorId: { type : String, required: true },
  authorName: { type : String, required: true },
  date_created: { type : Date, default: Date.now },
  published: {
    title: { type : String, default: "Untitled" },
    content: { type : String, default: "" },
    editorId: String,
    editorName: String,
    last_edited: { type : Date },
    tags: { type : Array, default: [] },
    upvotes: { type : Number, default: 0 },
    downvotes: { type : Number, default: 0 }
    // add schema for comments?
    },
  drafts: [{
    title: { type : String, default: "Untitled" },
    content: { type : String, default: "" },
    editorId: String,
    editorName: String,
    last_edited: { type : Date },
    tags: { type : Array, default: [] },
    upvotes: { type : Number, default: 0 },
    downvotes: { type : Number, default: 0 }
    // add schema for comments?
  }],
  history: [{
    title: String,
    content: String,
    editorId: String,
    editorName: String,
    last_edited: Date,
    tags: Array,
    upvotes: String,
    downvotes: String
    // add schema for comments?
  }],
});

/* make the model */
var Article = mongoose.model('Article', articleSchema);

/* export the model */
module.exports = Article;
