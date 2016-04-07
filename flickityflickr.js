/* Flickity Flickr - Populate a flickity slideshow with a flickr photostream | Joshua Woehlke | github.com/userexec/flickityflickr | Licensed MIT */
(function() {
	if (!$.fn.flickityFlickr) {
		$.fn.flickityFlickr = function(options) {

			var that = this;

			// Stop if not a valid selector
			if (!this.length) return false;

			if (!!options && typeof options.flickrId === 'string') {

				$.ajax({
					url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20atom%20where%20url%3D'https%3A%2F%2Fapi.flickr.com%2Fservices%2Ffeeds%2Fphotos_public.gne%3Fid%3D" + encodeURIComponent(options.flickrId) + "'&format=json&diagnostics=true&callback=",
					success: function(results) {

						results = results.query.results;

						// Stop if no results
						if (!results) { console.log('Feed not found for user ID ' + options.flickrId + '. Try using a service like http://idgettr.com/ to look up your Flickr ID.'); return false; }

						results = results.entry;

						// Stop if no images uploaded
						if (!results) { console.log('No images found in this Flickr feed. Have you uploaded content?'); }

						// Insert slides into specified shows
						that.each(function() {

							for (var i = 0; i < results.length; i++) {

								$(this).append('<div class="flickr_slide"><a class="flickr_link" href="' + results[i].link[0].href + '"><img class="flickr_image" src="' + results[i].link[1].href + '" /></a></div>');

							}

						});

						that.each(function() {

							// Run flickity with the remaining passed objects
							$(this).flickity(options);

							// Insert channel info and Yahoo! attribution since using YQL
							$(this).append('<div class="channelInfo" style="position: absolute; left: 0px; top: 0px; background: black; opacity: 0.5; padding: 0.4rem 0.5rem;"><a style="color: white !important; text-decoration: none; font-family: sans-serif;" href="' + results[0].author.uri + '" target="_blank">' + results[0].author.name + '\'s photostream</a></div>');
							$(this).append('<div class="yahooAttribution" style="position: absolute; right: 0px; bottom: 0px; background: black; opacity: 0.5;"><a href="https://www.yahoo.com/?ilc=401" target="_blank"><img src="https://poweredby.yahoo.com/white.png" width="134" height="29"/></a></div>');
							
							// Resize and reposition on settle due to unknown image sizing
							$(this).on('settle', function() {
								$(this).flickity('resize');
								$(this).flickity('reposition');
							});
						});
						
						// Return that for chaining
						return that;

					}
				});

			}

		}
	}
})();