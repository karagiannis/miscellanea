---
layout: post
title:  "Pre-compiled CSS"

page.date:   2015-11-07 00:04:49
page.categories: ['blogg']
page.title: Pre-compiled CSS
page.url: 2015-11-13-Pre-compiled_CSS.html
page.id: 2015-11-07-Pre-compiled CSS
page.categories: ['work', 'code']
page.comments: true

---

What do I think about pre-compiled CSS? The idea is good, not because I've seen anything yet that
I appreciate. These comments of mine, the one above and the below following, are requested answers to be submitted as
the first part of three obligatory examination assignments, at the course "Client-based Webb programming" at Linnaeus University.
One of the additional requirements of the first assignments is to publish a Jekyll based site, with some prescribed features.
An additional constraint to the assignment is that no pure CSS is allowed, only precompiled css in the form of SASS scripts.
At this writing moment I do not know if I will pass this first examination assignment, that is, if I have worked enough on the Jekyll site,
besides the enumerated features such as coupling to discus, and also if the instructors will consider my comments as a process
of clear enough thought and adequate reasoning.
I choose not to formulate myself in a rigorous scholarly type manner here, because according to the specification of the assignment,
as I've understood it, one is supposed  to present
 ones thoughts as in a blog environment,
To write like a blogger, so to speak.


I don't think that sass adds much value, save for the fact that one can assign variables and
 do basic math, but this is something that one really would expect of a scripting language, even if it is free.
 
 No, the truth is that CSS is in such a sorry state, and that sass makes very little to straighten up things.
 Variable declaration and nesting of primitives, all good, but cannot add any substantial value, to something that is essentially crap.
 
 I do not blame the staff of teachers, for choosing sass. The industry demands knowledge of sass, and it is
 apparent from the university course page that they are working in proximity with the industry, to be able
  to summon alumni with the right skill set, the kind of knowledge that is requested.
  
 Given the fact that CSS is so bad, adding SASS above, as a thin layer of paint, makes things just even worse,
 for somebody that yet haven't memorized the peculiar patterns of behaviour that CSS follows. It just adds to the burden.
 The instructors demand on me submitting the code in sass, fulfilling their part of the transaction,
 becomes for me in reality: 
 "try to re-fresh your memory of the peculiarities of CSS that you've unsuccessfully tried to memorize ,
  and once you have a working CSS-script translate it to sass, and make it look like you've coded in sass all the way".
 
  Some  patterns that CSS follows are just not predictable, cannot be deduced, one just have to memorize it. Add browser dependency concerns,
  and you find yourself in a guessing game were you add extra CSS statements, just to be sure that you cover all angles,
  just in case it wouldn't work in some other browser. Your doubling down on <code> display:block></code> statements,
  just to be covered, not because you understand why something worked or didn't worked.
  A while-loop in traditional programming language, is predictable, one can deduce the outcome by applying methodological,
  structured logical thinking, but this is really not the case for CSS, it is a game where you try to remember what worked before,
  it is not a thinking process were you deduce the outcome from a small set if rules.
 
 Let me give a telling example about the crappiness of CSS, who everyone who has done anything in it should have stumbled upon:
  Writing the About.md file, I had to align a picture horizontally with respect to the middle of the page.
  I added the statements that you can find on every CSS-site out there and in any book about CSS:
  <code>margin-left:auto; margin-right:auto; </code> ,the school-book CSS concept of centering something.
  There was an existing code-snippet in the <code>_base.scss file </code>, and I simply just added to it so it looked like this:
  {% highlight ruby %}
  img { 
      max-width: 100%;
      height:auto;
      vertical-align: middle;
      margin-right: auto ;
      margin-left:auto;
  }
 {% endhighlight %}
 
 I can agree that this code-snippet above looks decent, it looks like a statement from a respectable programming/scripting language,
  with the curly braces that you find in C, Java, C# etc.
  hence no problem, right? 
  Refering to the only element in the whole main-element, nothing but 1 image-tag, nothing beside it, noting above it, except the 
  header-element above and nothing below it save for the footer element, but these do not lay inside the main-element.
   Only one img-tag in the whole main-tag universe.
   Did it work?
  Well if that was the case, I would have no complaints.
  I would have no problem with CSS, at all, if it really worked, but it doesn't work. It  work  s o m e t i m e s,
  but not always, it depends on the constellation of stars at the vey moment  you are typing....
  You actually have to add <code>dispaly:block </code>, but that would also be okey, if that was always always the case.
  One can make some effort to memorize that "use display:block when you want to center an image"
  So this is how the working version looks like:
  {% highlight ruby %}
  img {
      max-width: 100%;
      height:auto;
      vertical-align: middle;
      margin-right: auto ;
      margin-left:auto;
      display:block;
  }
  {% endhighlight %}
  So I am annoyed over the fact that it works without <code>dispaly:block </code> in exactly the same circumstances elsewhere, in other browsers,
   or in the same browser that I usally use with elements above and under in the same main-tag, in the same browser, other times.
   It isn't context free, it might work without <code>display:block</code> if you have a p-tag below, but not if you have another tag,
   this time I had NOTHING!!!
  But really, why <code> display:block;</code> ? 
  A picture can never be something else than block like, it is inherently block-like, it is per definition a block, or at least
  if you not dissolve it in separate pixels, but then it is no longer a picture. Well philosophiclly you can argue that separated
  pixels also can represent something until a certain degree of separation . Is this the way I should think a about the 
  display:block statement? OK, if so, but what has that to do when I want to center a single, alone image element in the main element?
  
   Can one really deduce with logical thinking from a set of rules, that
  there must be a <code>dispaly:block </code> for an image to align center?
  If you don't add it,(sometimes) the picture is stuck left.
  
  Continuing with other parts that are just pure ugly...
  
  Lets say that you have this piece of HTML, this is taken from an instructors tutorial, from a previous course.
  {% highlight ruby %}
  <nav>
  	<p id="showMenuLink"><a href="#navMenus"><img src="pics/menu-icon.gif" alt="Visa meny"></a></p>
  	<div id="navMenus">
  		<ul id="globalnav">
  			<li><a href="index.htm">Introduction</a></li>
  			<li><a href="facts.htm" id="thisSection">Facts</a></li>
  			<li><a href="contact.htm">Kontakt</a></li>
  		</ul>
  		</div>
  	</nav>
  	{% endhighlight %}
  	You want to do responsive webb-design, so that global nav menu is changed from display inline, to be display
  	as a block when the browser is resized below a threshold width.
  	(Comment: Here the <code>display:block</code> statement makes sense for obvious reasons, but that's not my point here)
  	How is it done? I continue with the code from the university below.
  	First you hide the thumbnail picture that serves as clickable link, which will display the navigation when the 
  	browser is small.
  	{% highlight ruby %}
  	#showMenuLink {display:none;}
    #globalnav {background-color:#000; list-style:none;}
    #globalnav li {display:inline;}
    #globalnav a {text-decoration:none;}
    #globalnav a:link, #globalnav a:visited {background-color:#999; color:#FFF;}
    #globalnav a:hover, #globalnav a:active {background-color:#CCC; color:#666;}
    #globalnav #thisSection {background-color:#FC3; color:#666;}
    {% endhighlight %}
    
then you do a media query to make the browser to respond differently at a certain size
    
    
    {% highlight ruby %}
    @media screen and (max-width:360px) {
       #globalnav {padding:0;}
    	#globalnav li {display:block;}
    	#globalnav a {margin:0; padding:0.3em; font-size:1.5em; border-radius:0; border-bottom:1px solid #000; display:block;}
    	#globalnav a:link, #globalnav a:visited {background-color:#999; color:#FFF;}
    	#globalnav a:hover, #globalnav a:active {background-color:#CCC; color:#666;}  	
    	#showMenuLink {display:block; text-align:right; margin:0; padding:0.3em;}
    	#navMenus {display:none;}
    	#navMenus:target {display:block;}
    }
     {% endhighlight %}
     
  The first thing to notice is the pure ugliness of the concept of psudoclasses. Note the div of navmenues is used for the first
  time, and it is for the usage of displaying the global nav, but know as a block, the pseudoclass target refers only to the primitive
  that is written <bold> d i r e c t l y  u n d e r</bold> #navMenus in the HTML-code which is 
  <code><ul id="globalnav"></code>.
  If you don't understand that this is as bad as using goto-constructs or as bad and ugly as extensive use of global variables,
   or as bad as designing a programming languages that dependeds on the amount of tabs or spaces trailing a statement.
  You simply just don't do these ugly things.
  If you don't get it, then something is missing in your CS-education, or you have no sense of what is beautiful in programming code.
  
  For me, this is a an unmistaken sign of sloppiness, laziness, lack of care for details, lack of love to the art of programming,
   and absolutely no sense of pride in ones work.
  You just don't publish such rubbish, something that ugly and bad as the above structure, without having degenerated to someone 
  who really prefers to do something else than programming. 
  When you no longer feel any pride in your craftsmanship, then you no longer have concerns for details and only then
  you could design such a language as CSS, the same goes for sass. If you're gonna do something that takes care the mess off CSS
  do the complete work, go all the way, no half measures.
  
  A great chef would never serve a meal that he or she couldn't be proud over. It must be perfect, or as perfect as it can become,
  given the circumstances.
  
The second thing to notice is the instructor who has written the code has a display:block both at the li -level and the a -level, why is it
that an seasoned expert has written it that way? Is it just a copy and paste mistake,
Do we often see in a piece of ordinary programming code with something similar, for instance you have a variable declaration
<code>int count = 0;</code> and the next row again <code>int count = 0;</code> ? The fact is that it works in firefox even without the first
<code>display:block</code>.
Or is it just a typo, no it is not a typo, I am pretty sure about it. The truth is, and I am pretty sure of,
is that the expert cannot deduce how the code will behave
in all browsers, or even not in a single browser, because it is nowhere mathematically defined.
I've seen BNF specifications for CSS, but these describe only what is allowed to be written, BNF:s don't define the semantics,
only the allowed syntax, never the semantics. This is a serious problem, that demands a complete makeover od CSS.
  
  Wrapping up:
  What value, can a scripting-tool like scss have that does not take care of this idiocy of pseudo classes, the requirement of writing
  something direct below something so that dynamic CSS works, and the mess of doubling down on <code>display:block</code> statements. 
  
  Absolutely none, it is a piece of crap, just like css, which I passionately hate(because it cannot be predicted), and which SASS  does not attempt to hide.
  
 