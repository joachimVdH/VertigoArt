/*****************************************
 * Flickr API (in jQuery)
 * version: 1.0 (02/23/2009)
 * written for jQuery 1.3.2
 * by Ryan Heath (https://rpheath.com)
 *****************************************/
(function($) {
  // core extensions
  $.extend({
    // determines if an object is empty
    // $.isEmpty({})             // => true
    // $.isEmpty({user: 'rph'})  // => false
    isEmpty: function(obj) {
      for (var i in obj) { return false }
      return true
    }
  })
  
  // base flickr object
  $.flickr = {
    // the actual request url
    // (constructs extra params as they come in)
    url: function(method, params) {
      return 'https://api.flickr.com/services/rest/?method=' + method + '&format=json' +
        '&api_key=' + $.flickr.settings.api_key + ($.isEmpty(params) ? '' : '&' + $.param(params)) + '&jsoncallback=?'
    },
    // translate plugin image sizes to flickr sizes
    translate: function(size) {
      switch(size) {
        case 's' : return '_s'   // Square       (75w x 75h)
        case 'q' : return '_q'  // Large Square (150w x 150h)
        case 't' : return '_t'  // Thumbnail    (75w x 100h)
        case 'm' : return '_m'  // Small        (180w x 240h)
        case 'n' : return '_n'  // Small 320    (240w x 320h)
        case 'z' : return '_z'  // Medium 640   (480w x 640h)
        case 'c' : return '_c'  // Medium 800   (600w x 800h)
        case 'b' : return '_b'  // Large        (768w x 1024h)
        case 'h' : return '_h'  // Large        (1200w x 1600h)
        case 'k' : return '_k'  // Large        (1536w x 2048h)
        case 'o' : return '_o'  // Original image size
        default  : return ''    // Medium       (375w x 500h)
      }
    },
    // determines what to do with the links
    linkTag: function(text, photo, href) {
      if (href === undefined) href = ['https://www.flickr.com/photos', photo.owner, photo.id].join('/')      
      return '<a href="' + href + '" title="' + photo.title + '">' + text + '</a>'
    }
  }
  
  // helper methods for thumbnails
  $.flickr.thumbnail = {
    src: function(photo, size) {
      if (size === undefined) size = $.flickr.translate($.flickr.settings.thumbnail_size)
      return 'https://farm' + photo.farm + '.static.flickr.com/' + photo.server + 
        '/' + photo.id + '_' + photo.secret + size + '.jpg'
    },
    imageTag: function(image) {
      return '<img src="' + image.src + '" alt="' + image.alt + '" />'
    }
  }
  
  // accepts a series of photos and constructs
  // the thumbnails that link back to Flickr
  $.flickr.thumbnail.process = function(photos) {
    var thumbnails = $.map(photos.photo, function(photo) {
      var image = new Image(), html = '', href = undefined

      image.src = $.flickr.thumbnail.src(photo)
      image.alt = photo.title

      // var size = $.flickr.settings.link_to_size
      // if (size != undefined && size.match(/s|q|t|m|n|z|c|b|h|k|o/)) 
      
        // href = $.flickr.thumbnail.src(photo, $.flickr.translate(size))
      
        // html = $.flickr.linkTag($.flickr.thumbnail.imageTag(image), photo, href)
        
      //return ['<div>' + html + '</div>']
      return ['<div>' + $.flickr.thumbnail.imageTag(image) + '</div>']
    }).join("\n")
    
    return $('<div class="slider responsive"></div>').append(thumbnails)
  }
  
  // handles requesting and thumbnailing photos
  $.flickr.photos = function(method, options) {
    var options = $.extend($.flickr.settings, options || {}),
        elements = $.flickr.self, photos
    
    return elements.each(function() {
      $.getJSON($.flickr.url(method, options), function(data) {
        photos = (data.photos === undefined ? data.photoset : data.photos)
        elements.append($.flickr.thumbnail.process(photos))
      })
    })
  }
  
  // namespace to hold available API methods
  // note: options available to each method match that of Flickr's docs
  $.flickr.methods = {
    // https://www.flickr.com/services/api/flickr.photos.getRecent.html
    photosGetRecent: function(options) {
      $.flickr.photos('flickr.photos.getRecent', options)
    },
    // https://www.flickr.com/services/api/flickr.photos.getContactsPublicPhotos.html
    photosGetContactsPublicPhotos: function(options) {
      $.flickr.photos('flickr.photos.getContactsPublicPhotos', options)
    },
    // https://www.flickr.com/services/api/flickr.photos.search.html
    photosSearch: function(options) {
      $.flickr.photos('flickr.photos.search', options)
    },
    // https://www.flickr.com/services/api/flickr.photosets.getPhotos.html
    photosetsGetPhotos: function(options) {
      $.flickr.photos('flickr.photosets.getPhotos', options)
    }
  }
  
  // the plugin
  $.fn.flickr = function(options) {
    $.flickr.self = $(this)
    
    // base configuration
    $.flickr.settings = $.extend({
      api_key: '1e3a6df693e74ead13d1d1e9100f7c58',
      thumbnail_size: 't',
      link_to_size: 'z'
      
      //oOv7os0Fon1Ad3
      
      // 's' Square       (75w x 75h)
      // 'q' Large Square (150w x 150h)
      // 't' Thumbnail    (75w x 100h)
      // 'm' Small        (180w x 240h)
      // 'n' Small 320    (240w x 320h)
      // ''  Medium       (375w x 500h)
      // 'z' Medium 640   (480w x 640h)
      // 'c' Medium 800   (600w x 800h)
      // 'b' Large        (768w x 1024h)
      // 'h' Large        (1200w x 1600h)
      // 'k' Large        (1536w x 2048h)
      // 'o' Original image size
      
    }, options || {})
    
    return $.flickr.methods
  }
})(jQuery);