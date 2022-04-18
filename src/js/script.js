$(document).ready(function () {
  $('.slider').slick({
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true
        }
      }
    ]
  });

  $('ul.tabs').on('click', 'li:not(.tabs__item--active)', function () {
    $(this)
      .addClass('tabs__item--active').siblings().removeClass('tabs__item--active')
      .closest('div.container').find('div.catalog__wrapper').removeClass('catalog__wrapper--active').eq($(this).index()).addClass('catalog__wrapper--active');
  });

  $('.card__link').each(function (i) {
    $(this).on('click', function (e) {
      e.preventDefault();
      $('.card__wrapper').eq(i).toggleClass('card__wrapper--active');
    });
  });

  $('.card__back').each(function (i) {
    $(this).on('click', function (e) {
      e.preventDefault();
      $('.card__wrapper').eq(i).toggleClass('card__wrapper--active');
    });
  });
});