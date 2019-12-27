---
layout: post
title:  "What is Open Graph?"
page.date:   2015-11-06 00:04:49
page.categories: blogg

page.url: 2015-11-06-What-is-Open-Graph.html
page.id: 2015-11-06-What-is-Open-Graph
page.categories: ['work', 'code']
---

The question to be discussed as part of an examination assignment is

>What is Open Graph and how do you make use of it?

From the Open Graph protocol homepage http://ogp.me  <br>

>The Open Graph protocol enables any web page to become a rich object in a social graph.
>For instance, this is used on Facebook to allow any web page to have the same functionality as any other object on Facebook.
>
>While many different technologies and schemas exist and could be combined together, there isn't a single technology
>which provides enough information to richly represent any web page within the social graph.

In plain english:<br>
We need you stupid technocrat cattle who never have had the time to reflect upon human nature and world history,
to implement something so that we can track anybody and anything, so that it is
possible to draw a social graph, connecting the dots between who is who, who has visited what, who has read what,
who has seen what, who has listened to what and who knows what. <br>

Anyway, the way to implement this, is by writing og-type meta-data in the header of a HTML-page, like this, quoting from
their homepage
 {% highlight ruby %}
<html prefix="og: http://ogp.me/ns#">
<head>
<title>The Rock (1996)</title>
<meta property="og:title" content="The Rock" />
<meta property="og:type" content="video.movie" />
<meta property="og:url" content="http://www.imdb.com/title/tt0117500/" />
<meta property="og:image" content="http://ia.media-imdb.com/images/rock.jpg" />
 ...    
</head>
 ...    
</html> 
{% endhighlight %}
My open graph information that I was requested to submit, as a part of this assignement looks like this
{% highlight ruby %}
    <meta property="og:title" content="Lasse Karagiannis blogg" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://karagiannis.github.io" />
    <meta property="og:image" content="https://karagiannis.github.io/about"/>
{% endhighlight %}

The suggestion to publish my site on Facebook or twitter, to check if it works, will I not follow.
I hope it doesn't work.
