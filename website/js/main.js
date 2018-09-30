$(document).ready(function () {

  $(".button-collapse").sideNav();
  $('.slider').slider();
  $('.question').click(function () {
    $(this).siblings().slideToggle('0.3s', 'linear');
    $(this).toggleClass('open');
    // console.log($(this).find('.question:before'));
    // $(this).find('.question:before').css('transform', 'rotate(90deg)');
  });
  $(window).on('scroll', function (e) {
    var scrollTop = $(this).scrollTop();

    // if (scrollTop <= 0) {
    //     $('.main-nav').find('li').each(function () {
    //         $(this).removeClass('active');
    //     });
    // } else {
    $("nav").find(".left li").each(function () {
      var curLink = $(this).find("a").first();
      var anchorEl = $(curLink.attr("href"));
      if (anchorEl.offset().top <= scrollTop && anchorEl.offset().top + anchorEl.height() > scrollTop) {
        $(this).addClass('active').siblings().removeClass('active');
      }
    });
    // }
  });

  //owl
  $('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        768:{
            items:3
        },
        1000:{
            items:4
        }
    }
})

  // $('.show-on-hover').parent().hover(function() {
  //     $(this).find('.hide-on-hover').hide(0);
  //     $(this).find('.show-on-hover').fadeIn(500);
  // }, function() {
  //   $(this).find('.show-on-hover').hide(0);
  //   $(this).find('.hide-on-hover').fadeIn(500);
  // });
  $('nav').find('.left li').click(function (e) {
    e.preventDefault();
    scrollToID($(e.target).attr('href'), 500);
  });

  $('.animated-icon').hover(function () {
    $(this).addClass('pulse');
  }, function () {
    $(this).removeClass('pulse');
  });

  function scrollToID(id, speed) {
    var targetOffset = $(id).offset().top;
    var mainNav = $('nav');
    navClicked = true;
    $('html,body').animate({scrollTop: targetOffset}, speed);
    setTimeout(function () {
      navClicked = false;
    }, speed);
  }
});