function resize() {
	if ($('div.container').hasClass('opened')) {
		$('div.container').removeClass('opened');
		}
	}

$(document).ready(function() {
	$('div.container > header > div > ul').on('click', function() {
		$('div.container').toggleClass('opened');
		});
	return false;
	});