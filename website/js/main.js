$(document).ready(function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  $('.button-collapse').sideNav();
  $('.slider').slider();
  $('.question').click(function () {
    $(this).siblings().slideToggle('0.3s', 'linear');
    $(this).toggleClass('open');
  });
  $(window).on('scroll', function (e) {
    let scrollTop = $(this).scrollTop();

    // if (scrollTop <= 0) {
    //     $('.main-nav').find('li').each(function () {
    //         $(this).removeClass('active');
    //     });
    // } else {
    $('nav')
      .find('.left li')
      .each(function () {
        let curLink = $(this).find('a').first();
        let anchorEl = $(curLink.attr('href'));
        if (
          anchorEl.offset().top <= scrollTop &&
          anchorEl.offset().top + anchorEl.height() > scrollTop
        ) {
          $(this).addClass('active').siblings().removeClass('active');
        }
      });
    // }
  });

  //owl
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },

      550: {
        items: 2,
      },

      768: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  });

  // $('.show-on-hover').parent().hover(function() {
  //     $(this).find('.hide-on-hover').hide(0);
  //     $(this).find('.show-on-hover').fadeIn(500);
  // }, function() {
  //   $(this).find('.show-on-hover').hide(0);
  //   $(this).find('.hide-on-hover').fadeIn(500);
  // });
  $('nav')
    .find('.left li')
    .click(function (e) {
      e.preventDefault();
      scrollToID($(e.target).attr('href'), 500);
    });

  $('.animated-icon').hover(
    function () {
      $(this).addClass('pulse');
    },
    function () {
      $(this).removeClass('pulse');
    }
  );

  function scrollToID(id, speed) {
    let targetOffset = $(id).offset().top;
    // let mainNav = $('nav')
    navClicked = true;
    $('html,body').animate({ scrollTop: targetOffset }, speed);
    setTimeout(function () {
      navClicked = false;
    }, speed);
  }
});
