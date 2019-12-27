---
layout: post
title:  "Static site generators"
page.date:   2015-11-12 00:04:49
page.url: 2015-11-12-static-site-generators.html
page.id: 2015-11-12-static-site-generators
page.categories: ['work', 'code']
page.comments: true
---


This blog post is part of an examination assignment, and will be evaluated by an instructor from the course "Client based web-programming"
at Linnaeus University.

The question to discuss in this blog post is, what do I think of static site generators and for what projects are
they suitable for.
 
The threshold to set-up a blog and get started is very high, iif you compare it with respect to  Wordpress or Joomla.
The slogan  "blog like a hacker" is not for nothing. If you want have something that simply 
separates the list of your older posts to a different page other than the index.html, you have to do some Ruby using the Liquid template.
If you like to try out new things and test, if you're into the trial and error business, it might give you some satisfaction,
 but I am of a completely different breed, I usually oppose to
 start up any activity on things where I do not have access to a clear and complete set of documentation of everything at hand.

The documentation at the Jekyll project page https://jekyllrb.com/ is poor, and one is referenced to the Jekyll forum
where knowledge is passed down from people who know the internals of Jekyll and of course master Ruby, but for me that is never enough.
I am never interested in having something actually working at first hand, but first and foremost obtain an understanding before anything.
If I am required to paste in code to have something working, I feel not good at all if I don't have a complete understanding.
I do not feel bad for not having read through the Wordpress code related to publishing a post, but if I were required to paste code-snippets,
then the glove is thrown, I feel provoked and challenged, and I just have to pick it up.
The time-constrain for accomplishing this first part of the exam, did not allow me to check out Ruby and to delve into the internals of
Jekyll this added to my feel of frustration and in sequence made me to avoid as much Ruby-snippet pasting as much as I possible could.
 This approach was something that proved to me to be an achilles heel of mine,
and this personality trait took me on a painful tour.

However I could not resist the urge to obtain an understanding, so I read through http://liquidmarkup.org/, it didn't give much because I don't have any
knowledge in Ruby, I downloaded a Ruby package for windows from http://rubyinstaller.org/ installed it and tried to play around with it, but time was running
out of hand, and I had to abort it before obtaining much knowledge of value for dealing with Jekyll.

It seems like a potent tool for any project, that is, if you have the knowledge so that you can read and understand what is written,
and write your own code, then the gear-ratio amount of new added features versus lines of code, seems to be very high,
on the other hand if you don't understand Ruby and the Liquid syntax,
your going to be reduced to a begging script kiddie for a considerable amount of time.

Jekyll does not take a full submitted HTML-page it takes various kinds of non-html markup filetypes such as .textile and .markdown (or .md), which don't need
 to contain any tags besides what is referred to as yaml front matter. It seems that it does not care about the file suffix, as long as there is a
 yaml front matter, you can have a file-type ending of your own choice, where the limit is only your imagination.
Not one single complete html page, with the known standard tags can be passed into the system  unaltered, though.

I started up thinking that just pasting in an HTML
page from a previous course into index.html and its corresponding style.css into main.scss and modify from there, would be a short-cut,
but it became the complete opposite.
index.html is intended for the contents of the body of the welcome-page, though it does not even contain the HTML body tag.
The HTML template that is used, is in default.html, which is the only place where a complete minimum set of HTML tags, for page rendering, can be seen.
It has the html, head and body tag and the Liquid {{content}} primitive
where content is injected from processed markup pages and html-snippets in index.html. Other html-snippets that you want included which is not content related,
you put the _include directory. For instance, you place the html-code snippet for disqus in a file where the ending is .html,
and you link to it where it should fit in default.html through a Liquid filter include primitive such  as for instance  {% include disqus.html %}.
You can also include HTML-snippets, with the above Liquid syntax, to the templates page.html and posts.html, which are found together with default.html in the
_post directory.

Once that you've accpeted that your index.html from your oustide of Jekyll test, must be chopped up, and placed into the _include folder as .html files and parts of
it added to Jekylls index.html, you might think that one would certainly be able to add another complete HTML-file to be linked to in your navigation tag,
and just, circumvent the Jekyll engine, breaking rules and do things that are not intended is fun, right?

You cannot just add a second html page and think that you can easily get Jekyll to link to it in a html-navigation menu that you've put in
index.html, or if you write separate your navigation tag into nav.html and place it  in the _include -directory.
Surprise, surprise, it does not work that way! 
Jekyll takes a subset of ONE html page in its index.html, forget therefore a second complete tagged html-page,
it cannot be done, not without Ruby-code at least, I've learned that the hard way.
If you want to do that without Ruby, You have to change default.html and rearrange the default Liquid code, to make that work,
and if you do that, you've broken the Jekyll concept and are not doing Jekyll, you're doing something else.

If one hasn't tried it, one cannot fully appreciate the difficulty in adapting an existing full tagged html file and a working css file into
 a Jekyll structure, without any previous knowledge of Ruby and Liquid, and then  trying to have Jekyll to display it accordingly
 to what one expects comparing from a run outside of Jekyll.
I tried to adapt an ordinary navigation menu code in html and css, to make it look the way it looked outside Jekyll, 
the same code did not yield the same results.
Then as the reader might understand my happiness was nearly "complete" when understanding that Jekyll cannot take a second full tagged html-page and link to it.
It has to be broken up in pieces, and dealt with through Ruby.
 
 Again: 
 <code>
The Jekyll engine processes html snippets and markup and it must fit into their featured default.html template, which contains the full set of HTML-tags, for
 a HTML-page to be rendered in a browser, that is with the HTML
 -head and -body tag. Every line of html-snippets that you write yourself, must fit into that template to be presented.
 The idea is that you should only write your content in non-html markup files and that Jekyll should generate the Html, if you want
 to change something from the default boiler-plate look, you have to  do Ruby-coding yourself,
 or have somebody code it for you. Forget making content in HTML, because Jekyll
 only takes parts of one html file, which you brake into parts into separate .html- files, and place into the _include folder. You then include your
 HTML-snippets into default.html with the liquid filter include primitive.
 </code>
 
Until you drop the idea of fitting html-snippets into Jekylls structure which only drives you to refurnish the built Liquid filters
 in post.html, page.html and default.html you will be into a ton of hurt. 
 

I don't yet have the knowledge to estimate if Jekyll would be a suitable choice for a site like amazon.com, but it seems to me that if it 
can host github and their database which could be of be considerable size, it must be able to handle a site like amazon .com.

As I've understood it, the amount of transactions a site can handle is a matter of how many SQL-servers you can have running in tandem,
and that factor is only limited by the amount of hardware one can afford.
But can it run multiple threads to talk to many SQL-servers, and is multi threading really crucial?
Javascript on Node on the server side is coming in a big way, but that is single threaded, and referred
to as a non-blocking single threaded architecture. Advanced concepts as "promise" are talked about on youtube and forums, 
but I've haven't had time to dive into the subject, but it seems that this promise construct allows node to handle a large number of transactions 
 by a polling scheme, but I am way out of my competence zone here and am only guessing based on rumors.
 

Lets wrap up the Jekyll question, finally.
If you can build the fairly complex Github interface on it, and handle its database and do it that fast because of its static nature, then what 
is the limit? I don't see any limits. Github can de facto handle transactions between customer and database.

Depending on the level of competence of the developer, it can evidently be used for anything. I don't know Ruby, so I cannot estimate
how many lines of codes it would take to set up a Github site or an e-commerce site, but the code snippets that I've seen have been short
and compact and deliver features with few lines of code, the downside must be that the level of competence must necessarily 
scale inversely proportional to the compactness of the code, that is, if not horrendous amounts of developing time,
 are spent on Jekyll user interface stuff, but on the other hand every added layer almost always reduces the flexibilty to the advanced developer.
 
I feel that I cannot present a valuable answer on the question on which kind of projects Jekyll is suited for,
because there are so many variables that at present time are unknown to me, and I've not reached the competence level (yet) to be able
to launch a github similar site or a large transaction e-commerce site, with or without Jekyll, to taken seriously, from my laymans perspective, yes it is
suitable for all web sites, for the above mentioned reasons.