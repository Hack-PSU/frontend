var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
$(document).ready(function () {
  var posts;
  getMediumPosts(function(p) {
    posts = p;
    displayMediumPosts(posts);
  });

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

  function getMediumPosts(callback) {
    $.ajax({
      url: 'https://medium.com/@hackpsu_team/latest?format=json',
      converters: {
        'text json': window.String,
      },
      success(data) {
        var respJson = data.replace('])}while(1);</x>', '');
        var obj = JSON.parse(respJson);
        var post = obj.payload.references.Post;
        if (post) {
          var posts = Object.values(post).map(function(d) {
            return Object.assign({}, {
              title: d.title,
              createdAt: d.createdAt,
              subtitle: d.virtuals.subtitle,
              image: d.virtuals.previewImage.imageId ?
                'https://cdn-images-1.medium.com/max/800/'+d.virtuals.previewImage.imageId : null,
              url: 'https://medium.com/@hackpsu_team/'+d.uniqueSlug
            });
          });
          callback(posts);
        }
      },
      error(data) {
        console.log(data);
      },
    });
  }

  function displayMediumPosts(posts) {
    posts.forEach(function (post) {
      var date = new Date(post.createdAt);
      var div =
        '<div class="card">' +
        '<div class="card-image"> ' +
        '<img src=' + (post.image ? post.image : 'https://hackpsu.org/assets/images/logo-all-blue-no-padding.svg') + ' />' +
          '<span class="card-title">' + post.title + '</span>' +
          '</div>' +
          '<div class="card-content">' +
          '<p>' + post.subtitle + '</p>' +
          '<div class="card-action">' +
          '<div class="card-date">' +
          '<span>' +
          monthNames[date.getMonth()] + ' ' + new Date(post.createdAt).getDate() +
          '</span>' +
          '<span class="card-year">' + new Date(post.createdAt).getFullYear() + '</span>' +
          '</div>' +
          '<a class="card-link" target="_blank" href=' + post.url + '>' +
          'Read on Medium' +
          '</a>' +
          '</div>' +
          '</div>' +
          '</div>';
      $('.medium-post-viewer').append(div);
    });
  }
});
