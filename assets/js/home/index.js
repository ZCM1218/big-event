$(function () {
  let layer = layui.layer;
  getAvatarandName();
  // 退出
  $('.logout').on('click', function (e) {
    e.preventDefault();
    layer.confirm('确认退出?', { icon: 3, title: '提示' }, function (index) {
      // 退出需要做的事请：清空本地存储、跳转到登录界面、关闭提示信息（index-->confirm）
      localStorage.removeItem('token');
      location.href = 'login.html';
      layer.close(index);
    });
  })
})
// 封装全局函数，给修改用户信息界面使用，可通过window获取
function getAvatarandName() {
  $.ajax({
    url: '/my/userinfo',
    success: function (res) {
      // 要先进行判断，否则直接进入主页会报错，停留在主页了
      if (res.status !== 0) {
        return layer.msg("获取用户信息失败！");
      }
      // 短路运算，||表示找真值，找到就返回该真值
      let name = res.data.nickname || res.data.username;
      let first = name[0].toUpperCase();
      $('.welcome').text(name);
      // 头像展示
      if (res.data.user_pic) {
        $('.layui-nav-img').show().attr('src', res.data.user_pic);
        $('.text-avatar').hide();
      } else {
        $('.layui-nav-img').hide();
        $('.text-avatar').show().text(first);
      }
    }
  });
}