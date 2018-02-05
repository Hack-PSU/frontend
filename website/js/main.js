$(document).ready(function() {

  $('.question').click(function() {
    $(this).siblings().slideToggle('slow', 'linear');
    $('p span', this).toggleClass('rotated');
  });
});
