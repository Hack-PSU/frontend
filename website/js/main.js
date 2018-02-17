$(document).ready(function () {

    $('.question').click(function () {
        $(this).siblings().slideToggle('slow', 'linear');
        $('p span', this).toggleClass('rotated');
    });
    $(window).on('scroll', function (e) {
        var scrollTop = $(this).scrollTop();

        // if (scrollTop <= 0) {
        //     $('.main-nav').find('li').each(function () {
        //         $(this).removeClass('active');
        //     });
        // } else {
        $(".main-nav").find("li").each(function () {
            var curLink = $(this).find("a").first();
            var anchorEl = $(curLink.attr("href"));
            if (anchorEl.offset().top <= scrollTop && anchorEl.offset().top + anchorEl.height() > scrollTop) {
                $(this).addClass('active').siblings().removeClass('active');
            }
        });
        // }
    });
    $('.main-nav').find('li').click(function (e) {
        e.preventDefault();
        scrollToID($(e.target).attr('href'), 500);
    });

    $('.animated-icon').hover(function () {
        $(this).addClass('pulse');
    }, function() {
        $(this).removeClass('pulse');
    });

    function scrollToID(id, speed) {
        var targetOffset = $(id).offset().top;
        var mainNav = $('.main-nav');
        navClicked = true;
        $('html,body').animate({scrollTop: targetOffset}, speed);
        setTimeout(function () {
            navClicked = false;
        }, speed);
    }
});