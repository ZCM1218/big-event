$(function () {
  let layer = layui.layer;
  function renderForm() {
    layui.use('form', function () {
      var form = layui.form;
      form.render();
    });
  };
  $.ajax({
    url: '/my/article/cates',
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg('获取文章分类列表失败！');
      }
      let htmlStr = template('artCateTpl', res);
      $('select').append(htmlStr);
      renderForm();
    }
  })
})