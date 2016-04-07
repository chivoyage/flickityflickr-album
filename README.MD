# Flickity Flickr

A tiny jQuery plugin to pull a Flickr photostream by user ID into a [Flickity](http://flickity.metafizzy.co/) slideshow. Works exactly like Flickity, same options, etc. Just initialize your show with `$('show').flickityFlickr(*options*);` instead of `$('#show').flickity(*options*);` and include one extra key/value pair in your options, `flickrId`, with your Flickr user ID as a string. Look up your user ID at [idgettr.com](http://idgettr.com/).

All this plugin does is hop in before Flickity initializes and pull your latest photos as linked slides into the box you're initializing Flickity on, then with the slides in there it initializes Flickity like normal. You'll need jQuery and Flickity loaded already, naturally. Required attribution is handled automatically.

Really useful for when Flickrit starts including malicious advertising and popups in their free Flickr embeds. I mean, seriously guys. It's a freaking Flickr embed.