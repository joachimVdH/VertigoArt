
// check that everything is loaded
$(document).ready(function() {
	// config the flickr js
	var config = {}	      
	// $('#art').flickr(config).photosetsGetPhotos({photoset_id: '72157645000386054'})
	// $('#art').flickr(config).photosetsGetPhotos({photoset_id: '72157647311421128'})	;
	
	// misschien komt de volgende functie te vroeg, en mag deze pas opgebouwd worden als flickr gedaan is.
	
		// config the slick gallery
		$('.responsive').slick({
			dots: true,
			infinite: true,
			speed: 300,
			slidesToShow: 3,
			slidesToScroll: 3,
			centerMode: true,
			autoplay: true,
			autoplaySpeed: 3000,
			// responsive: [
			// 	{
			// 		breakpoint: 1024,
			// 		settings: {
			// 			slidesToShow: 3,
			// 			slidesToScroll: 3,
			// 			infinite: true,
			// 			dots: true
			// 		}
			// 	},
			// 	{
			// 		breakpoint: 600,
			// 		settings: {
			// 			slidesToShow: 2,
			// 			slidesToScroll: 2
			// 		}
			// 	},
			// 	{
			// 		breakpoint: 480,
			// 		settings: {
			// 			slidesToShow: 1,
			// 			slidesToScroll: 1
			// 		}
			// 	}
			// ]
		});
	
})

