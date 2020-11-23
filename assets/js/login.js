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
  let form = layui.form;
  let layer = layui.layer;
  form.verify({
    pass: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    confirm: function (value, item) {
      if (value !== $('.reg [name=password]').val()) {
        return '两次密码输入不一致，请重新输入！';
      }
    }
  });
  $('.reg form').on('submit', function (e) {
    e.preventDefault();
    // console.log($('.reg form').serialize());
    $.ajax({
      url: '/api/reguser',
      type: 'POST',
      data: $('.reg form').serialize(),
      success: function (res) {
        console.log(res);
        if (res.status === 0) {
          layer.msg(res.message + '即将跳转至登录界面！', { time: 2000 }, function () {
            $('#gotoLogin').click();
          });
        } else { layer.msg(res.message) }
      }
    });
    $('.reg form')[0].reset();
  })
  $('.login form').on('submit', function (e) {
    e.preventDefault();
    console.log($('.login form').serialize());
    $.ajax({
      url: '/api/login',
      type: 'POST',
      data: $('.login form').serialize(),
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          layer.msg(res.message);
        } else {
          localStorage.setItem('token', res.token);
          layer.msg(res.message + '即将跳转至后台主页！', { time: 2000 }, function () {
            location.href = 'index.html';
          })
        }
      }
    })
  })
})