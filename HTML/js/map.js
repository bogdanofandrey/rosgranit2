function init() {
	var office = new ymaps.Placemark([55.899981, 37.378189], {
			balloonContent: null,
			hintContent: 'Офис ТПО «Росгранит»'
			}, {
    		iconLayout: 'default#image',
    		iconImageHref: 'img/location.svg',
    		iconImageSize: [40, 40],
    		iconImageOffset: [-20, -40]
			}),
		warehouse = new ymaps.Placemark([55.913060, 37.529478], {
			balloonContent: null,
			hintContent: 'Склад ТПО «Росгранит»'
			}, {
    		iconLayout: 'default#image',
    		iconImageHref: 'img/location.svg',
    		iconImageSize: [40, 40],
    		iconImageOffset: [-20, -40]
			}),
		expo = new ymaps.Placemark([55.670130, 37.583810], {
			balloonContent: null,
			hintContent: 'Выставочная площадка в ТВК «Экспострой»'
			}, {
    		iconLayout: 'default#image',
    		iconImageHref: 'img/location.svg',
    		iconImageSize: [40, 40],
    		iconImageOffset: [-20, -40]
			});
    myMap = new ymaps.Map('map', {
        center: [55.8, 37.5],
        zoom: 10,
        controls: []
    	}, {
        buttonMaxWidth: 300
        }),
    ZoomLayout = ymaps.templateLayoutFactory.createClass('<div class="zoom"><div class="in" id="in"></div><div class="out" id="out"></div></div>', {
        build: function () {
        	ZoomLayout.superclass.build.call(this);
            this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
            this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);
            $('#in').bind('click', this.zoomInCallback);
            $('#out').bind('click', this.zoomOutCallback);
            },
        clear: function () {
            $('#in').unbind('click', this.zoomInCallback);
            $('#out').unbind('click', this.zoomOutCallback);
            ZoomLayout.superclass.clear.call(this);
            },
        zoomIn: function () {
            var map = this.getData().control.getMap();
            this.events.fire('zoomchange', {
                oldZoom: map.getZoom(),
                newZoom: map.getZoom() + 1
                });
            },
        zoomOut: function () {
            var map = this.getData().control.getMap();
            this.events.fire('zoomchange', {
                oldZoom: map.getZoom(),
                newZoom: map.getZoom() - 1
                });
            }
        }),
    zoomControl = new ymaps.control.ZoomControl({
    	options: {
    		layout: ZoomLayout
    		}
    	});
    myMap.controls.add(zoomControl);
    myMap.behaviors.disable('scrollZoom');
    myMap.geoObjects.add(office).add(warehouse).add(expo);
    
    $('a.location').on('click', function(e) {
    	var name = $(this).attr('href').replace(new RegExp('#'), '');
    	myMap.setCenter($(this).data('coordinates'));
    	myMap.setZoom(16);
		$('html, body').stop().animate({
			scrollTop: $('div.container > section.map').offset().top
			}, 600);
		e.preventDefault();
		});
    }
    
ymaps.ready(init);