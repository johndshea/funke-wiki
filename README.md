# Project Two - John Shea

Link: https://shrouded-hamlet-6065.herokuapp.com/

TODO:

* find a way to build revision history
Concept 1: store full old versions in the article object. Have the object contain an array, and push old content to that array when changing the present content.
- built, but isn't adding the "old versions" to the array. Hmmmmm.
Concept 2: http://software.danielwatrous.com/representing-revision-data-in-mongodb/

* use populate or something similar to display articles written by a user on that user's profile page

* Write readme

Wireframes:

![](http://cl.ly/image/002g3N1n3I2z/wiki_db_wireframe.jpg)

![](http://cl.ly/image/2A3Z350g2Y1K/wiki_routes_wireframe_1.jpg)

![](http://cl.ly/image/1f222N1J2c1G/wiki_routes_wireframe_2.jpg)

![](http://cl.ly/image/1t0O0e1t1f0G/wiki_views_wireframe_1.jpg)

![](http://cl.ly/image/2W0m0X381U3o/wiki_views_wireframe_2.jpg)

BUGS:

* markdown not displaying properly on the article index page

* hamburger nav is blocked from loading by Google Chrome when on heroku. https://support.google.com/chrome/answer/1342714?hl=en

* fix funky placement of tobias head icon

* sessions are not persistent across server restarts by default. Check the express-session page for ways to do it.

* add proper column/row formatting to each view page as per materialize guidelines (remove from layouts.ejs) - http://materializecss.com/grid.html

* make article list formatting nicer - see http://materializecss.com/collections.html#circle

* in general, make formatting nicer throughout the site.

users:
Finn B, fb@test.com, “finn"

Article Lorem Ipsum:

db.articles.insert([{
  title:  "Lorem Ipsum",
  authorId: "561d5552478f35d572327bd2",
  authorName:   "Finn Borge",
  content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  tags: ["tag"],
  drafts: [],
  history: [],
  date_created: ISODate("2015-10-13T19:38:47.301Z"),
  last_edited: "never"
},{
  title:  "Lorem Ipsum",
  authorId: "561d5552478f35d572327bd2",
  authorName:   "Finn Borge",
  content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  tags: ["tag"],
  drafts: [],
  history: [],
  date_created: ISODate("2015-10-13T19:38:47.301Z"),
  last_edited: "never"
},{
  title:  "Lorem Ipsum",
  authorId: "561d5552478f35d572327bd2",
  authorName:   "Finn Borge",
  content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  tags: ["tag"],
  drafts: [],
  history: [],
  date_created: ISODate("2015-10-13T19:38:47.301Z"),
  last_edited: "never"
},{
  title:  "Lorem Ipsum",
  authorId: "561d5552478f35d572327bd2",
  authorName:   "Finn Borge",
  content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  tags: ["tag"],
  drafts: [],
  history: [],
  date_created: ISODate("2015-10-13T19:38:47.301Z"),
  last_edited: "never"
},{
  title:  "Lorem Ipsum",
  authorId: "561d5552478f35d572327bd2",
  authorName:   "Finn Borge",
  content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  tags: ["tag"],
  drafts: [],
  history: [],
  date_created: ISODate("2015-10-13T19:38:47.301Z"),
  last_edited: "never"
},{
  title:  "Lorem Ipsum",
  authorId: "561d5552478f35d572327bd2",
  authorName:   "Finn Borge",
  content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  tags: ["tag"],
  drafts: [],
  history: [],
  date_created: ISODate("2015-10-13T19:38:47.301Z"),
  last_edited: "never"
},{
  title:  "Lorem Ipsum",
  authorId: "561d5552478f35d572327bd2",
  authorName:   "Finn Borge",
  content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  tags: ["tag"],
  drafts: [],
  history: [],
  date_created: ISODate("2015-10-13T19:38:47.301Z"),
  last_edited: "never"
}]);
