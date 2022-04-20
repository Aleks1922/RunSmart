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

  //Modal

  $('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn();
  });
  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #thanks, #order').fadeOut();
  });

  $('.button--card').each(function (i) {
    $(this).on('click', function () {
      $('#order .modal__desc').text($('.card__title').eq(i).text());
      $('.overlay, #order').fadeIn();
    });
  });

  //Form Validate

  function validateForm(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Пожалуйста, введите своё имя",
          minlength: jQuery.validator.format("Введите не менее {0} символов")
        },
        phone: "Пожалуйста, введите свой номер телефона",
        email: {
          required: "Пожалуйста, введите свой email адрес",
          email: "Неправильно введен email адрес"
        }
      }
    });
  }

  validateForm('#consultation-form');
  validateForm('#consultation form');
  validateForm('#order form');

  $('input[name=phone]').mask("+7(999) 999-99-99");

  //Отправка почты

  $('form').submit(function (e) {
    e.preventDefault();

    if (!$(this).valid()) {
      return;
    }

    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function () {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset');
    });
    return false;
  });

  //smoth scroll and pageup

  $(window).scroll(function () {
    if ($(this).scrollTop() > 1400) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });

  $("a").on('click', function (event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 500, function () {

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});