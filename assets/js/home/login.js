$(function () {
  // 去注册页面
  $('#gotoReg').on('click', function () {
    // console.log('hh');
    $('.reg').show();
    $('.login').hide();
  })
  // 去登录页面
  $('#gotoLogin').on('click', function () {
    // console.log('ff');
    $('.reg').hide();
    $('.login').show();
  })
  let form = layui.form;
  let layer = layui.layer;
  // layui提供的表单校验，数组和函数两种表达方式
  // 将规则名称作为lay-verify属性的值
  form.verify({
    pass: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    // value指使用该校验规则的表单的值，item指该表单的DOM对象
    confirm: function (value, item) {
      if (value !== $('.reg [name=password]').val()) {
        return '两次密码输入不一致，请重新输入！';
      }
    }
  });
  // 注册
  $('.reg form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      url: '/api/reguser',
      type: 'POST',
      data: $('.reg form').serialize(),
      success: function (res) {
        // 回调函数要先进行验证
        if (res.status === 0) {
          layer.msg(res.message + '即将跳转至登录界面！', { time: 2000 }, function () {
            $('#gotoLogin').click();
          });
        } else { layer.msg(res.message) }
      }
    });
    // 清空输入框
    $('.reg form')[0].reset();
  })
  // 登录
  $('.login form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      url: '/api/login',
      type: 'POST',
      data: $('.login form').serialize(),
      success: function (res) {
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