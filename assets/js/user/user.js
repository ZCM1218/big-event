$(function () {
  let form = layui.form;
  let layer = layui.layer;
  // var id;
  // 封装获取用户信息函数，多处调用
  function getInfo() {
    $.ajax({
      url: '/my/userinfo',
      success: function (res) {
        // layui提供的表单赋值
        form.val('formTest', res.data);
        // id = res.data.id;
      }
    })
  }
  getInfo();
  // layui对button的点击事件做了处理，以后都使用表单的submit事件，防止有冲突
  $(".userInfo").on('submit', function (e) {
    // $(".submitBtn").on('click', function (e) {
    console.dir(this);
    e.preventDefault();
    // 发送修改用户信息的请求
    $.ajax({
      type: 'POST',
      url: '/my/userinfo',
      data: $('.userInfo').serialize(),
      success: function (res) {
        if (res.status === 1) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        // 重新获取修改后的用户信息，渲染
        // 通过window.parent到父页面去，调用父页面的获取信息并渲染的函数
        window.parent.getAvatarandName();
      }
    })
  });
  // 重置
  $('.restBtn').on('click', function (e) {
    e.preventDefault();
    getInfo();
  });
})

