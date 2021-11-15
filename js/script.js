$(document).ready(function () {



	// Sliders
	$('.mainscreen__slider').slick({
		appendArrows: $('.mainscreen__arrows'),
		prevArrow: '<div class="arrows__arrow"><div class="_left"></div></div>',
		nextArrow: '<div class="arrows__arrow"><div class="_right"></div></div>',
		dots: true,
		appendDots: $('.mainscreen__control'),
		dotsClass: 'mainscreen__pagination pagination',
  })

	$('.services__slider').slick({
		arrows: false,
		slidesToShow: 5,
		slidesToScroll: 2,
		dots: true,
		appendDots: $('.services__control'),
		dotsClass: 'services__pagination pagination',
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				}
			},
			{
				breakpoint: 960,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 720,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	})

	$('.projects__slider').slick({
		slidesToShow: 3,
		slidesToScroll: 2,
		appendArrows: $('.projects__arrows'),
		prevArrow: '<div class="projects__arrow _left">< предыдущий</div>',
		nextArrow: '<div class="projects__arrow _right">cледующий ></div>',
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 720,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
		]
	})

	$('.brends__slider').slick({
		slidesToShow: 5,
		slidesToScroll: 2,
		dots: true,
		appendDots: $('.brends__control'),
		dotsClass: 'brends__pagination pagination',
		responsive: [
			{
				breakpoint: 960,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 720,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
		]
	})

	$('.news__slider').slick({
		arrows: false,
		slidesToShow: 3,
		slidesToScroll: 2,
		dots: true,
		appendDots: $('.news__control'),
		dotsClass: 'news__pagination pagination _dark',
		responsive: [
			{
				breakpoint: 720,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
		]
	})

	$('.reviews__slider').slick({
		arrows: false,
		slidesToShow: 2,
		slidesToScroll: 1,
		dots: true,
		appendDots: $('.reviews__control'),
		dotsClass: 'news__pagination pagination',
		responsive: [
			{
				breakpoint: 960,
				settings: {
					slidesToShow: 1,
				}
			},
		]
	})



	//Open search in header
	$('.header__search-btn').click(function() {
		if ($('.header__search').hasClass('_open')) {
			$('.header__search').removeClass('_open')
		} else {
			$('.header__search').addClass('_open')
		}
	})



	// Open/close menu
	$('.header__menu-btn').click(function() {
		if ($('.header__menu-btn').hasClass('_open')) {
			$('.header__menu-btn').removeClass('_open')
			$('.header__menu').removeClass('_open')
		} else {
			$('.header__menu-btn').addClass('_open')
			$('.header__menu').addClass('_open')
		}
	})



	//Stop maps
	$('.contact__maps-wrapper').click(function() {
		$(this).addClass('_hidden')
	})



	//Inputs
	$('.field__input').mousedown(function () {
		let field = $(this).parent('.field')
		if (!field.hasClass('_focus')) {
			field.addClass('_focus')
		}
	})



	//Quiz
	$('.foundation-2__btn').click(function() {
		let level = $(this).attr('data-level')
		$('._level-' + level).removeClass('_visible')
		$('._level-' + (++level)).addClass('_visible')
	})



	//Validation
	function validation(thisis) {
		let field = thisis;
		let input = field.children('.field__input');
		let value = input.val();
		if (value == '') {
			if (field.hasClass('_required')) {
				field.addClass('_error');
			} else {
				field.removeClass('_focus')
			}
		} else {
			field.removeClass('_error, _focus').addClass('_valid');
		}
	}
	function clearForm(form) {
		form.find('.field').each(function () {
			$(this).children('.field__input').val('');
			$(this).removeClass('_error, _valid');
		});
	}
	function validate(form) {
		form.find('.field').each(function () {
			validation($(this));
		});

		form.find('.checkbox._required > input').each(function () {
			if ($(this).prop('checked')) {
				$(this).parent('.checkbox').removeClass('_error');
			} else {
				$(this).parent('.checkbox').addClass('_error');
			}
		});

		if ($('.checkbox._required > input', form).prop('checked')) {
			$(this).parent('.checkbox').removeClass('_error');
		} else {
			$(this).parent('.checkbox').addClass('_error');
		}

		if ($('.field, .checkbox', form).hasClass('_error')) {
			return false;
		} else {
			return true
		}
	}
	function errorSend() {
		$.magnificPopup.open({
			items: { src: '#popup-error' }
		});
	}
	function successSend() {
		$.magnificPopup.open({
			items: { src: '#popup-successfully' }
		});
	}
	$('.field__input').on('focus', function () {
		$(this).parent('.field').removeClass('_error');
		$(this).parent('.field').removeClass('_valid');
		$(this).parent('.field').addClass('_focus');
	})
	$('.field__input').on('blur', function () {
		validation($(this).parent('.field'));
	})



	//Submit
	$('.button-submit').on('click', function (e) {
		e.preventDefault();
		let target = $(e.target);
		let form = target.closest('form');
		let submit = validate(form);
		if (submit === true) {
			let data = form.serialize();
			
			if (!form.find('[name="action"]').length) {
				data = data + '&action=blablabla'
			}
			else {
				if (!form.find('[name="action"]').val()) {
					data = data + '&action=blablabla'
				}
			}

			$.post('ajax/', data, function (result) {
				if (result.status == 'success') {successSend()}
				else {alert(result.message)}
			}, 'json').fail(function () { errorSend() })
			clearForm(form)
		}
	});



	//Popup
	$('.popup_open').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#name',
	});



})