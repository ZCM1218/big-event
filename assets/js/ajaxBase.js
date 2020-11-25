// ajax基础配置，根路径
$.ajaxPrefilter(function (options) {
  // console.log(options);
  options.url = 'http://ajax.frontend.itheima.net' + options.url;

  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token')
    };
  }

  options.complete = function (xhr) {
    console.log(xhr);
    if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
      localStorage.removeItem('token');
      // 跳转到登录页面
      location.href = 'login.html';
    }
  }
});

