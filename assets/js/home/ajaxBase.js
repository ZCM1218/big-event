// ajax基础配置，根路径
$.ajaxPrefilter(function (options) {
  // options为ajax的配置项(对象)
  options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
  // 配置需要请求头的请求,根据接口文档来设置
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token')
    };
  }
  // 限制用户权限
  // ajax的本质是xhr,如果ajax请求完成后,xhr的状态码和信息都是不成功的,就退出到登录界面
  options.complete = function (xhr) {
    if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
      localStorage.removeItem('token');
      // 跳转到登录页面
      location.href = 'login.html';
    }
  }
});

