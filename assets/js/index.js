$(function () {
  let layer = layui.layer;
  getAvatarandName();
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

// 封装全局函数，可通过window获取，给修改用户信息界面使用
function getAvatarandName() {
  $.ajax({
    url: '/my/userinfo',
    // headers: {
    //   Authorization: localStorage.getItem('token')
    // },
    success: function (res) {
      // console.log(res);
      // 要先进行判断，否则直接进入主页会报错，停留在主页了
      if (res.status !== 0) {
        return layer.msg("获取用户信息失败！");
      }
      let name = res.data.nickname || res.data.username;
      let first = name[0].toUpperCase();
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