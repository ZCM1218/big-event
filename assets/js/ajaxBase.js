// ajax基础配置，根路径
$.ajaxPrefilter(function (options) {
  console.log(options);
  options.url = 'http://ajax.frontend.itheima.net' + options.url;
})