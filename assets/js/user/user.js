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
        form.val('formTest', res.data);
        // localStorage.setItem('id', res.data.id);
        id = res.data.id;
        // console.log(id);
      }
    })
  }
  getInfo();
  $(".submitBtn").on('click', function (e) {
    e.preventDefault();
    // console.log(id);
    // console.log(localStorage.getItem('id'));
    $.ajax({
      type: 'POST',
      url: '/my/userinfo',
      // headers: {
      //   Authorization: localStorage.getItem('token')
      // },
      // data: $('.userInfo').serialize(),
      data: {
        // id: localStorage.getItem('id'),
        id: id,
        nickname: $('#nickname').val(),
        email: $('#email').val()
      },
      success: function (res) {
        layer.msg(res.message);
        console.log(res);
        // 重新获取修改后的用户信息，渲染
        $.ajax({
          url: '/my/userinfo',
          // headers: {
          //   Authorization: localStorage.getItem('token')
          // },
          success: function (res) {
            // 要先进行判断，否则直接进入主页会报错，停留在主页了
            if (res.status !== 0) {
              return layer.msg("获取用户信息失败！");
            }
            console.log(res);
            let name = res.data.nickname || res.data.username;
            let first = name[0].toUpperCase();
            // console.log(first);
            $('.welcome').text(name);
            if (res.data.user_pic) {
              $('.layui-nav-img').show().attr('src', res.data.user_pic);
              $('.text-avator').hide();
            } else {
              $('.layui-nav-img').hide();
              $('.text-avator').show().text(first);
            }

          }
        });
      }
    })
  });

  $('.restBtn').on('click', function (e) {
    e.preventDefault();
    getInfo();
  });
  //f'f'f
})