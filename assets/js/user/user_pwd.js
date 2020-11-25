$(function () {
  let form = layui.form;
  let layer = layui.layer;

  form.verify({
    pass: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    newPwd: function (value) {
      if (value === $('[name=oldPwd]').val()) {
        return '新密码与原密码不能相同！';
      }
    },
    rePwd: function (value) {
      if (value !== $('[name=newPwd]').val()) {
        return '请重新确认新密码！';
      }
    }
  })

  $('.layui-form').on('submit', function (e) {
    // $('.layui-btn').on('click', function (e) {
    e.preventDefault();
    // console.log('hh');
    // 阻止按钮的默认事件会和layui给按钮做的点击事件有冲突
    // return false;
    $.ajax({
      type: 'POST',
      url: '/my/updatepwd',
      data: $('.layui-form').serialize(),
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          layer.msg(res.message);
        }
        layer.msg(res.message);
        $('.layui-form').get(0).reset();
      }
    })
  })

})

