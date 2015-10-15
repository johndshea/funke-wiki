# Project Two - John Shea

Link: https://funke-wiki.herokuapp.com/

TODO:

* Write readme

* To build draft voting:
Every time a vote comes in,
a) add the appropriate vote
b) add upvotes to downvotes
c) if total votes is greater than a certain threshold, check ratio. if both check out,
d) set currentversion = the winning draft (use splice so as to remove the draft from the drafts array)
e) move currentversion to the archive

* then build commenting? store comments in the comment schema you already wrote in each published/draft/archived object.

* get upvote/comment/downvote icons working http://materializecss.com/icons.html

* use populate or something similar to display articles written by a user on that user's profile page

* improve text areas (may have to stop using autosize): http://materializecss.com/forms.html#textarea

* allow authors to lock articles from others' editing?

* set up article delete buttons that appear or disappear based on who is logged in

* use tooltips for flash messages http://materializecss.com/dialogs.html

* sessions are not persistent across server restarts by default. Check the express-session page for ways to do it.

* use tabs for drafts and archived versions, rather than listing them below main body? http://materializecss.com/tabs.html

* redefine your routes so that you only check for userId once and not on every single route every time

BUGS:

* on the article index page, using marked() overrides the truncate class. Shorty suggests using a mini body preview?

* fix funky placement of tobias head icon

* add proper column/row formatting to each view page as per materialize guidelines (remove from layouts.ejs) - http://materializecss.com/grid.html

* in general, make formatting nicer throughout the site. Use http://materializecss.com/collections.html#circle for user list

Wireframes:

![](http://cl.ly/image/002g3N1n3I2z/wiki_db_wireframe.jpg)

![](http://cl.ly/image/2A3Z350g2Y1K/wiki_routes_wireframe_1.jpg)

![](http://cl.ly/image/1f222N1J2c1G/wiki_routes_wireframe_2.jpg)

![](http://cl.ly/image/1t0O0e1t1f0G/wiki_views_wireframe_1.jpg)

![](http://cl.ly/image/2W0m0X381U3o/wiki_views_wireframe_2.jpg)

users:
Finn B, fb@test.com, “finn"
John S, js@test.com, "john"

Entries:
John Kim:
You used to console log me errors.
Late night when you need my help.
Console log me errors.
Late night when you need my help.
And I know when that server ping.
That could only mean one thing.
I know when that server ping. That could only mean one thing.
Ever since I started coding you.
Been rendering all them pages by yourself now.
Everybody knows and I feel left out.
Server just went down you got me stressed out.
You used to console log me errors...

Article Lorem Ipsum:

db.articles.insert([{},{}]);
