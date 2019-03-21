var gallery = null;

$(document).ready(function() {
    if ($('div.container > article > div.gallery > div.swiper').length !== 0 && $('div.container > article > div.gallery > div.swiper > ul > li').length > 2 ) {
    	gallery = new Swiper('div.container > article > div.gallery > div.swiper', {
    		loop: true,
    		slidesPerView: 3,
    		spaceBetween: 10,
 			breakpoints: {
    			480: {
      				slidesPerView: 1
    				},
    			1040: {
      				slidesPerView: 2
    				}
    			},
    		navigation: {
    			nextEl: 'div.container > article > div.gallery > div.next',
    			prevEl: 'div.container > article > div.gallery > div.prev'
  				}
    		});
    	}	
	return false;
	});