(function ($) {
	var navbarLinks = $('.navbar__links');
	var clickShowPopup = $('.c-list__image li a');
	var clickClosePopup = $('.c-popup > div > a');
	var getConditionClick = 'a[href*=\\#]:not([href=\\#])';

	function resetDefault() {
		$('.navbar__menu').removeClass('is-active'),
			$('body').css({
				'touch-action': 'auto',
				'overflow-x': 'hidden',
				'overflow-y': 'auto',
				position: 'static',
				top: 'auto',
				height: 'auto',
			}),
			$('html, body').scrollTop($('body').attr('data-position'));
	}

	function setDefault() {
		let getPositionScroll = $(window).scrollTop();
		let getOuterHeight = $('body').outerHeight();
		$('body').attr('data-position', getPositionScroll),
			$('body').css({
				top: '-' + getPositionScroll + 'px',
				left: 0,
				width: '100%',
				height: getOuterHeight + 'px',
				position: 'fixed',
				'z-index': '-1',
				'touch-action': 'none',
				'overflow-y': 'auto',
			});
	}

	function isCurrentLink() {
		if (navbarLinks.length > 0) {
			navbarLinks.on('click', function (e) {
				e.preventDefault();

				$(this)
					.addClass('is-current-section')
					.parent()
					.siblings()
					.children()
					.removeClass('is-current-section');
			});
		}
	}

	function scrollToSection() {
		if (getConditionClick.length > 0) {
			$(document).on('click', getConditionClick, function () {
				if (
					location.pathname.replace(/^\//, '') ==
						this.pathname.replace(/^\//, '') &&
					location.hostname == this.hostname
				) {
					var target = $(this.hash);
					resetDefault();
					target = target.length
						? target
						: $('[name=' + this.hash.slice(1) + ']');
					if (target.length) {
						$('html,body').animate(
							{
								scrollTop: target.offset().top,
							},
							1000,
						);
						return false;
					}
				}
			});
		}
	}

	function showPopup() {
		if (clickShowPopup.length > 0) {
			clickShowPopup.on('click', function (e) {
				e.preventDefault();
				$(this)
					.attr('data-popup', true)
					.parent()
					.siblings()
					.children()
					.attr('data-popup', false);
				$(this).closest('body').find('.c-popup').attr({ 'data-show': true });
				$(this).children().clone().appendTo('.c-popup > div');
				setDefault();
			});
		}
	}

	function closePopup() {
		if (clickClosePopup.length > 0) {
			clickClosePopup.on('click', function (e) {
				e.preventDefault();
				$(this).closest('.c-popup').attr('data-show', false);
				$(this).siblings().remove();
				resetDefault();
			});
		}
	}

	function toggleMobileMenu() {
		if ($('.navbar-button__menu').length > 0) {
			$('.navbar-button__menu').on('click', function (e) {
				e.preventDefault();
				let getPositionScroll = $(window).scrollTop();
				let getOuterHeight = $('body').outerHeight();
				$('body').toggleClass('is-mobile');
				$('body').hasClass('is-mobile')
					? ($('body').attr('data-position', getPositionScroll),
					  $('body').css({
							width: '100%',
							height: getOuterHeight + 'px',
							position: 'fixed',
							'z-index': '-1',
							'overflow-y': 'auto',
					  }),
					  $('.navbar__menu, .navbar-button__menu').addClass('is-active'))
					: ($('.navbar__menu,  .navbar-button__menu').removeClass('is-active'),
					  setTimeout(function () {
							resetDefault();
					  }, 700));
			});
		}
	}
	function init() {
		isCurrentLink();
		scrollToSection();
		showPopup();
		closePopup();
		toggleMobileMenu();
	}
	$(document).ready(function () {
		init();
	});
})(jQuery);
