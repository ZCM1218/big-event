$(function () {
  let layer = layui.layer;
  $.ajax({
    url: '/my/userinfo',
    headers: {
      Authorization: localStorage.getItem('token')
    },
    success: function (res) {
      // console.log(res);
      let name = res.data.nickname || res.data.username;
      let first = name[0].toUpperCase();
      $('.welcome').text(name);
      if (res.data.user_pic) {
        $('.layui-nav-img').show();
        $('.text-avator').hide();
      } else {
        $('.layui-nav-img').hide();
        $('.text-avator').show().text(first);
      }
    }
  });
  $('.logout').on('click', function (e) {
    e.preventDefault();
    layer.confirm('确认退出?', { icon: 3, title: '提示' }, function (index) {
      //do something
      localStorage.removeItem('token');
      location.href = 'login.html';
      layer.close(index);
    });
  })
})