# Project Two - John Shea

Link: https://funke-wiki.herokuapp.com/

TODO:

* use populate or something similar to display articles written by a user on that user's profile page

* Write readme

SHORTY NOTES:

* To build draft voting:
Every time a vote comes in,
a) add the appropriate vote
b) add upvotes to downvotes
c) if total votes is greater than a certain threshold, check ratio. if both check out,
d) set currentversion = the winning draft (use splice so as to remove the draft from the drafts array)
e) move currentversion to the archive

* then build commenting? store comments in the comment schema you already wrote in each published/draft/archived object.

* allow authors to lock articles from others' editing?

* set up buttons that appear or disappear based on who is logged in

* use tooltips for flash messages http://materializecss.com/dialogs.html

* use tabs for drafts and archived versions, rather than listing them below main body? http://materializecss.com/tabs.html


Wireframes:

![](http://cl.ly/image/002g3N1n3I2z/wiki_db_wireframe.jpg)

![](http://cl.ly/image/2A3Z350g2Y1K/wiki_routes_wireframe_1.jpg)

![](http://cl.ly/image/1f222N1J2c1G/wiki_routes_wireframe_2.jpg)

![](http://cl.ly/image/1t0O0e1t1f0G/wiki_views_wireframe_1.jpg)

![](http://cl.ly/image/2W0m0X381U3o/wiki_views_wireframe_2.jpg)

BUGS:

* on the article index page, using marked() overrides the truncate class. Shorty suggests using a mini body preview?

* hamburger nav is blocked from loading by Google Chrome when on heroku. https://support.google.com/chrome/answer/1342714?hl=en

* fix funky placement of tobias head icon

* sessions are not persistent across server restarts by default. Check the express-session page for ways to do it.

* add proper column/row formatting to each view page as per materialize guidelines (remove from layouts.ejs) - http://materializecss.com/grid.html

* make article list formatting nicer - see http://materializecss.com/collections.html#circle

* add tobias peek image to welcome page

* in general, make formatting nicer throughout the site.

users:
Finn B, fb@test.com, “finn"
John S, js@test.com, "john"

Article Lorem Ipsum:

db.articles.insert([{},{}]);
