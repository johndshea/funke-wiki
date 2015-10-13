# Project Two - John Shea

TODO: Write stuffs

![](http://cl.ly/image/002g3N1n3I2z/wiki_db_wireframe.jpg)

![](http://cl.ly/image/2A3Z350g2Y1K/wiki_routes_wireframe_1.jpg)

![](http://cl.ly/image/1f222N1J2c1G/wiki_routes_wireframe_2.jpg)

![](http://cl.ly/image/1t0O0e1t1f0G/wiki_views_wireframe_1.jpg)

![](http://cl.ly/image/2W0m0X381U3o/wiki_views_wireframe_2.jpg)

BUGS:
* I think the "users" and "session" routes might be duplicative. Check up on it.

* consider basing routes on user name or email, not id.

* hamburger nav is blocked from loading by Google Chrome when on heroku. https://support.google.com/chrome/answer/1342714?hl=en

* author name has to be manually entered as of now. Need to have it automatically populate from session info.

* Article last updated timestamp shows the time the edit form was loaded, not
the time the submit button was pressed.

* editing an article erases all tags (because they're currently implemented as checkboxes). Probably need to put some client-side javascript to check the boxes that show up in the article tags array.

* fix funky placement of tobias head icon

* sessions are not persistent across server restarts by default. Check the express-session page for ways to do it. 
