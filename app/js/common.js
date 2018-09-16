$(function(){


	// popup gallery

	 $(".mfp-gallery").each(function() {
		$(this).magnificPopup({
		delegate: 'a',	
		mainClass: 'mfp-zoom-in',
		type: 'image',
		tLoading: '',
		gallery:{
			enabled:true,
		},
		removalDelay: 300,
		callbacks: {
			beforeChange: function() {
				this.items[0].src = this.items[0].src + '?=' + Math.random(); 
			},
			open: function() {
				$.magnificPopup.instance.next = function() {
					var self = this;
					self.wrap.removeClass('mfp-image-loaded');
					setTimeout(function() { $.magnificPopup.proto.next.call(self); }, 120);
				}
				$.magnificPopup.instance.prev = function() {
					var self = this;
					self.wrap.removeClass('mfp-image-loaded');
					setTimeout(function() { $.magnificPopup.proto.prev.call(self); }, 120);
				}
			},
			imageLoadComplete: function() { 
				var self = this;
				setTimeout(function() { self.wrap.addClass('mfp-image-loaded'); }, 16);
			}
		}
	});
	});

// popup gallery End

// begin popup window 
	
	$(".popup-with-move-anim").magnificPopup({
			type: 'inline',

			fixedContentPos: true,
			fixedBgPos: true,

			overflowY: 'auto',

			closeBtnInside: true,
			preloader: true,
			
			midClick: true,
			removalDelay: 300,
			mainClass: 'my-mfp-slide-bottom'
		});

// begin map for yandex in contacts


		ymaps.ready(init);
		var myMap,
				myPlacemark1,
				myCollection

				function init(){
					myMap=new ymaps.Map("my_map",{
						center:[44.48744063, 34.13307740],
						zoom:13
					});

					myCollection = new ymaps.GeoObjectCollection({}, {
						 preset: 'islands#blueIcon' //все метки красные
						 
					});
					 
					myMap.behaviors.disable([
						'scrollZoom'
						]);				
					
					
					myPlacemark1 = new ymaps.Placemark([44.50038809, 34.13358166], { 
						preset: 'islands#blueIcon',
						balloonContentHeader: 'Клубный дом "Дворец Аутка"',
						balloonContentFooter: 'г.Ялта, микрорайон Аутка, ул. Кедровая 23а',
						hintContent: 'Адрес дома: г.Ялта, микрорайон Аутка, ул. Кедровая 23а' 
					});


				myCollection.add(myPlacemark1);
				myMap.geoObjects.add(myCollection);
				

				}


// end map for yandex

//E-mail Ajax Send

	
	$(".callback").submit(function() {

		$(this).validate({
			rules: {
				имя: 'required',
				телефон: 'required',
				email: {
					required: true,
					email: true
				}

			},
			messages: {
				имя: 'Введите ваше имя',
				телефон: 'Введите ваш телефон',
				email: 'Введите ваш email'
			}
		});
		if ($(this).valid()) {
				var th = $(this);
							$.ajax({
								method: "POST",
								url: "https://formspree.io/d-autka@yandex.ru",  //Change!!
								data: th.serialize(),
								dataType: "json"
							});
								// После отправки письма будет открываться блок с уведомлением
										$(".popup-succes-wrap").toggleClass("hidden");
										$(".form-logo img").toggleClass("hidden");
										  
								setTimeout(function() {
									// Done Functions
									th.trigger("reset");
									$(".popup-succes-wrap").toggleClass("hidden");
									$.magnificPopup.close();
								}, 3000);
		};

			
			return false;
					
	});



	// begin scroll to  

	$(".header-mnu li a").click(function() {
		
		$(this).mPageScroll2id({
			offset:0
		});	
	});

		$(".hidden-mnu li a").click(function() {

			$(".hidden-mnu").slideToggle();
			$(".toggle-mnu").toggleClass("on");
			$(this).mPageScroll2id({
			offset:0
			});
	});

	/* begin toggle-mnu button */
	$(".toggle-mnu").click(function() {
		$(this).toggleClass("on");
		$(".hidden-mnu").slideToggle();
		return false;
	});
/* end toggle-mnu button */

/* begin mobile menu */

	$(".hamburger").click(function(event) {

		$('.hamburger').toggleClass('is-active');
		$(".hidden-mnu").slideToggle();
	});



});

