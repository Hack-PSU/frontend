$(document).ready(() => {
  $('.button-collapse').sideNav();
  $('.slider').slider();
  $('.question').click(function () {
    $(this).siblings().slideToggle('0.3s', 'linear');
    $(this).toggleClass('open');
    // console.log($(this).find('.question:before'));
    // $(this).find('.question:before').css('transform', 'rotate(90deg)');
  });
  $(window).on('scroll', function (e) {
    const scrollTop = $(this).scrollTop();

    // if (scrollTop <= 0) {
    //     $('.main-nav').find('li').each(function () {
    //         $(this).removeClass('active');
    //     });
    // } else {
    $('nav').find('.left li').each(function () {
      const curLink = $(this).find('a').first();
      const anchorEl = $(curLink.attr('href'));
      if (anchorEl.offset().top <= scrollTop && anchorEl.offset().top + anchorEl.height() > scrollTop) {
        $(this).addClass('active').siblings().removeClass('active');
      }
    });
    // }
  });

  // $('.show-on-hover').parent().hover(function() {
  //     $(this).find('.hide-on-hover').hide(0);
  //     $(this).find('.show-on-hover').fadeIn(500);
  // }, function() {
  //   $(this).find('.show-on-hover').hide(0);
  //   $(this).find('.hide-on-hover').fadeIn(500);
  // });
  $('nav').find('.left li').click((e) => {
    e.preventDefault();
    scrollToID($(e.target).attr('href'), 500);
  });

  $('.animated-icon').hover(function () {
    $(this).addClass('pulse');
  }, function () {
    $(this).removeClass('pulse');
  });

  function scrollToID(id, speed) {
    const targetOffset = $(id).offset().top;
    const mainNav = $('nav');
    navClicked = true;
    $('html,body').animate({ scrollTop: targetOffset }, speed);
    setTimeout(() => {
      navClicked = false;
    }, speed);
  }
});
