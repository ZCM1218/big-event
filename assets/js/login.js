$(function () {
  $('#gotoReg').on('click', function () {
    // console.log('hh');
    $('.reg').show();
    $('.login').hide();
  })
  $('#gotoLogin').on('click', function () {
    // console.log('ff');
    $('.reg').hide();
    $('.login').show();
  })
  $('.reg form').on('submit', function (e) {
    e.preventDefault();
    // console.log('tijiao');

  })
})