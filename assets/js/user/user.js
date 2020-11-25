$(function () {
  let form = layui.form;
  let layer = layui.layer;
  var id;
  // console.log(id);
  function getInfo() {
    $.ajax({
      url: '/my/userinfo',
      // headers: {
      //   Authorization: localStorage.getItem('token'),
      // },
      success: function (res) {
        // 通过name将res中的内容填充到表单中对应name属性的input中，所以要存储id就可以加一个name为id的表单来存
        form.val('formTest', res.data);
        // localStorage.setItem('id', res.data.id);
        id = res.data.id;
        // console.log(id);
      }
    })
  }
  getInfo();
  $(".userInfo").on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/my/userinfo',
      data: {
        id: id,
        nickname: $('#nickname').val(),
        email: $('#email').val()
      },
      success: function (res) {
        if (res.status === 1) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        console.log(res);
        // 重新获取修改后的用户信息，渲染
        // console.log(window.parent.getAvatarandName);
        // 通过window.parent到父页面去，调用父页面的获取信息并渲染的函数
        window.parent.getAvatarandName();
      }
    })
  });

  $('.restBtn').on('click', function (e) {
    e.preventDefault();
    getInfo();
  });
  //f'f'f
})