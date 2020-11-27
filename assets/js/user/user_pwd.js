$(function () {
  let form = layui.form;
  let layer = layui.layer;
  // 修改密码时的表单校验
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
  // 提交修改密码请求
  $('.layui-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/my/updatepwd',
      data: $('.layui-form').serialize(),
      success: function (res) {
        if (res.status !== 0) {
          layer.msg(res.message);
        }
        layer.msg(res.message);
        $('.layui-form').get(0).reset();
      }
    })
  })

})

