var tabs = null,
	main = null;

function main() {    
	main = new Swiper('div.container > div.swiper-main', {
    	loop: true,
    	slidesPerView: 1,
        keyboard: {
    		enabled: true,
    		onlyInViewport: false
  			},
  		speed: 450,
  		preloadImages: true,
  		pagination: {
        	el: 'div.container > div.swiper-main > div',
        	clickable: true
      		},
    	observer: true
    	});
    return false;
    }

function resize() {
	if ($('div.container').hasClass('opened')) {
		$('div.container').removeClass('opened');
		}
	if (!tabs && $('div.container > article > div > div.swiper-tabs').length!==0) {
		setTimeout(function() {
			tabs = new Swiper('div.container > article > div > div.swiper-tabs', {
        		slidesPerView: 'auto',
        		mousewheel: true,
        		freeMode: true
    			});
			}, 50);
		}
	if (!main && $('div.container > div.swiper-main').length!==0) {
		setTimeout(function() {
			main = new Swiper('div.container > div.swiper-main', {
				loop: true,
				slidesPerView: 1,
				keyboard: {
    				enabled: true,
    				onlyInViewport: false
  					},
  				speed: 450,
  				preloadImages: true,
  				pagination: {
        			el: 'div.container > div.swiper-main > div',
        			clickable: true
      				}
				});
			}, 50);
		}
	if ($('div.choose-items > ul').length!==0) {
		$("div.choose-items > ul").css({'display' : 'none'});
		}
	if ($('div.choose-items > span').hasClass('selected')) {
		$('div.choose-items > span').removeClass('selected');
		}
	}

function clear(elements) {
	elements.each(function() {
		if ($(this).val()) {
			$(this).val('');
			}
		if ($(this).next('span').hasClass('selected')) {
			$(this).next('span').removeClass('selected');
			}
		if ($(this).hasClass('error')) {
			$(this).removeClass('error');
			}
		if ($(this).hasClass('success')) {
			$(this).removeClass('success');
			}
		});
	return false;
	}
	
function isName(name) {
	var regex = new RegExp(/^([а-яА-Яa-zA-Z _.-]{2,30})+$/);
	return regex.test(name);
	}

function isEmail(email) {
	var regex = new RegExp(/^(('[\w-\s]+')|([\w-]+(?:\.[\w-]+)*)|('[\w-\s]+')([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	return regex.test(email);
	}
	
function isPhone(phone) {
	var regex = new RegExp(/^([0-9 )+(-]{18})+$/);
	return regex.test(phone);
	}
	
function isRequire(classname) {
	if ($('div.form.' + classname + ' input.error').length !== 0) {
		if ($('div.form.' + classname + ' > form > div > div > button').hasClass('active')) {
			$('div.form.' + classname + ' > form > div > div > button').removeClass('active');
			}
		}
	else {
		if ($('div.form.' + classname + ' .required > input').length !== $('div.form.' + classname + ' .required > input.success').length) {
			if ($('div.form.' + classname + ' > form > div > div > button').hasClass('active')) {
				$('div.form.' + classname + ' > form > div > div > button').removeClass('active');
				}
			}
		else {
			if (!$('div.form.' + classname + ' > form > div > div > button').hasClass('active')) {
				$('div.form.' + classname + ' > form > div > div > button').addClass('active');
				}
			}
		}
	return false;
	}

$(document).ready(function() {
	$('div.container > header > div > ul').on('click', function() {
		$('div.container').toggleClass('opened');
		});
	$('div.container > span').on('click', function() {
		if ($("div.container").hasClass("opened")) {
			$("div.container").removeClass("opened");
			}
		});
	$('div.container > footer > div > ul > li > button').on('click', function(e) {
		$('div.callback').css('top', parseInt($(window).scrollTop()+20) + 'px').toggleClass('opened');
		 e.preventDefault();
		});
	$('div.callback > button').on('click', function() {
		$('div.callback').removeClass('opened');
		});	
	$('.field').on('propertychange change click keyup input paste', function() {
		var element = this;
		setTimeout(function () {
			if (!$(element).val()) {
				if ($(element).next('span').hasClass('selected')) {
					$(element).next('span').removeClass('selected');
					}
				if ($(element).hasClass('error')) {
					$(element).removeClass('error');
					}
				if ($(element).hasClass('success')) {
					$(element).removeClass('success');
					}
				if ($(element).hasClass('selected')) {
					$(element).removeClass('selected');
					}
				}
			else {
				if (!$(element).next('span').hasClass('selected')) {
					$(element).next('span').addClass('selected');
					}
				if ($(element).parent().hasClass('required')) {
					if ($(element).attr('name') == 'uname') {
						var result = isName($(element).val());
						}
					if ($(element).attr('name') == 'uphone') {
						var result = isPhone($(element).val());
						}
					if ($(element).attr('name') == 'uemail') {
						var result = isEmail($(element).val());
						}
					if (!result) {
						if ($(element).hasClass('success')) {
							$(element).removeClass('success');
							}
						$(element).addClass('error');
						}
					else {
						if ($(element).hasClass('error')) {
							$(element).removeClass('error');
							}
						$(element).addClass('success');
						}
					}
				else {
					if ($(element).attr('name') == 'uname') {
						var result = isName($(element).val());
						}
					if ($(element).attr('name') == 'uemail') {
						var result = isEmail($(element).val());
						}			
					if (!result) {
						if ($(element).hasClass('selected')) {
							$(element).removeClass('selected');
							}
						$(element).addClass('error');
						}
					else {
						if ($(element).hasClass('error')) {
							$(element).removeClass('error');
							}
						$(element).addClass('selected');
						}
					}
				}
			isRequire($(element).data('form'));
			}, 100);
		});
	$('span.checkbox').on('click', function() {
		if (!$(this).hasClass('checked')) {
			$(this).addClass('checked');
			$(this).prev('input').prop('checked', true);
			$(this).prev('input').addClass('success');
			}
		else {
			$(this).removeClass('checked');
			$(this).prev('input').prop('checked', false);
			$(this).prev('input').removeClass('success');
			}
		isRequire($(this).data('form'));
		});
	$('div.form > form > div > div > button').on('click', function() {
		if ($(this).hasClass('active')) {
			/* $(this).parents('form').submit(); - убрать комментирование в боевом режиме, кусок ниже удалить */
			$('div.form.'+ $(this).data('form')).addClass('success');
			}
		});
	clear($('.field'));
	$('input[type=tel]').inputmask('+7 (999) 999-99-99');
	if ($('div.container > article > div > div.swiper-tabs > ul > li.selected').length !== 0) {
		if ($('div.container > article > div > ul.service.' + $('div.container > article > div > div.swiper-tabs > ul > li.selected').data('class')).length !== 0 && !$('div.container > article > div > ul.service.' + $('div.container > article > div > div.swiper-tabs > ul > li.selected').data('class')).hasClass('selected')) {
			$('div.container > article > div > ul.service').removeClass('selected');
			$('div.container > article > div > ul.service.' + $('div.container > article > div > div.swiper-tabs > ul > li.selected').data('class')).addClass('selected');
			}
		}
	$('div.container > article > div > div.swiper-tabs > ul > li').on('click', function() {
		if (!$(this).hasClass('selected') && $('div.container > article > div > ul.service.' + $(this).data('class')).length !== 0) {
			$('div.container > article > div > div.swiper-tabs > ul > li').removeClass('selected');
			$('div.container > article > div > ul.service').removeClass('selected');
			$(this).addClass('selected');
			$('div.container > article > div > ul.service.' + $(this).data('class')).addClass('selected');
			}
		});
		


	if ($('div.choose-items > ul > li.selected').lenght !== 0) {
		$('div.choose-items > span').html($('div.choose-items > ul > li.selected').html());		
		$('div.container > div.table > table').removeClass('selected');
		$('div.container > div.table > table.' + $('div.choose-items > ul > li.selected').data('class')).addClass('selected');
		}
	$('div.choose-items').on('click', 'span', function() {
		var position = $(this).position();
		var isHeight = position.top + $(this).outerHeight() - 1;
		$('div.choose-items > ul').css({'display' : 'block', 'left' : position.left + 'px', 'top' : isHeight + 'px', 'width' : $(this).outerWidth() + 'px'});			
		if (!$(this).hasClass('selected')) {
			$(this).addClass('selected');
			}
		});
	$('div.choose-items > ul > li').click(function() {
		$('div.choose-items > span').html($(this).html());		
		$('div.choose-items > ul > li').removeClass('selected');
		$(this).addClass('selected');
		if ($('div.choose-items > span').hasClass('selected')) {
			$('div.choose-items > span').removeClass('selected');
			}
		$('div.container > div.table > table').removeClass('selected');
		$('div.container > div.table > table.' + $(this).data('class')).addClass('selected');
		$('div.choose-items > ul').css({'display' : 'none'});
		});
		
	return false;
	});
	
	
$(document).mouseup(function(e) {
	if (!$('div.form.cb').is(e.target) && $('div.form.cb').has(e.target).length === 0 && $('div.form.cb:visible').length !== 0) {
		if ($('div.callback').hasClass('opened')) {
			$('div.callback').removeClass('opened');
			}
    	}
	if (!$('div.choose-items > ul').is(e.target) && $('div.choose-items > ul').has(e.target).length === 0 && $('div.choose-items > ul:visible').length!=0) {
		$('div.choose-items > ul').css({'display' : 'none'});
		if ($('div.choose-items > span').hasClass('selected')) {
			$('div.choose-items > span').removeClass('selected');
			}
    	}
    return false;
	});