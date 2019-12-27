---
   layout: post
   title:  "What is robots.txt?"
   date:   2015-11-11 00:04:49
   categories: blogg
   comments: true
   page.url: 2015-11-11-What is robots.txt.html
   page.id: 2015-11-11-What is robots.txt
   page.categories: ['work', 'code']
---

The question to be discussed as part of an examination assignement is what is robots.txt and how have you configured it for your site?
From http://www.robotstxt.org/robotstxt.html

>"Web site owners use the /robots.txt file to give instructions about their site to web robots; this is called The Robots Exclusion Protocol.
>
>It works likes this: a robot wants to vists a Web site URL, say http://www.example.com/welcome.html.
> Before it does so, it firsts checks for http://www.example.com/robots.txt, and finds: <br>
<code>
User-agent: * <br>
Disallow: /
</code><br>
>The "User-agent: *" means this section applies to all robots. The "Disallow: /" tells the robot that it should not visit any pages on the site."
>

So a robot is a web crawler, a program that resides on a server and requests http-pages from Web-servers. It reads links that is pointed
to by the visited sites index.html and finds the related html files that are from that particular site.
From the mentioned site, we learn that search engines use these kinds of scripts to build up their database
 of existing files that are located on incumbent web servers in cyberspace.

The mentioned site also teaches that malwares use the same technique for harvesting e-mail addresses or for detecting vulnerabilities, and
that the malware obviously ignore the requested privacy as coded into the robots.txt file.

The configuration I've used is to dissallow all robot activity, with no exceptions.
I have the configuration: <br>
<code>
User-agent: *<br>
Disallow: /
</code><br>
 
 I've considered to allow google, which can be done with the following lines
in robots.txt

<code>
User-agent: Google <br>
Disallow: <br>
User-agent: * <br>
Disallow: / 
</code><br>

But I've decided not to do it, because I've left a big enough track of myself in cyberspace, for interested members of my lineage,
to discover who I am or was in my afterlife.