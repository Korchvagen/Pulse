$(document).ready(function () {
  //Carousel
  $('.carousel__inner').slick({
    speed: 1200,
    adaptiveHeight: false,
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
    responsive: [
      {
        breakpoint: 990,
        settings: {
          arrows: false,
          infinite: true,
          dots: true
        }
      }
    ]
  });

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  function toggleCard(item) {
    $(item).each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__reverse').eq(i).toggleClass('catalog-item__reverse_active');
      });
    });
  }

  toggleCard('.catalog-item__link');
  toggleCard('.catalog-item__back');

  //Modal
  $('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn();
  });

  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #order, #thanks').fadeOut();
  });

  $('.button_mini').each(function (i) {
    $(this).on('click', function () {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn();
    });
  });

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: "Пожауйста, введите ваше имя",
        phone: "Пожалуйста, введите ваш номер телефона",
        email: {
          required: "Пожалуйста, введите вашу почту",
          email: "Неправильно введен адрес почты"
        }
      }
    });
  }

  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#order form');

  //Phone number mask
  $('input[name=phone]').mask("+375 (99) 999-99-99");

  //Mailer
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

      $('form').trigger('reset');
    });
    return false;
  })

  //Smooth scroll and pageup
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });

  $("a[href='#up']").on('click', function (event) {
    const _href = $(this).attr('href');

    $('html, body').animate({
      scrollTop: $(_href).offset().top + "px"
    });
  });

  new WOW().init();
});