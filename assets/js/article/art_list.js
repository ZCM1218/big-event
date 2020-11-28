$(function () {
  let layer = layui.layer;
  let query = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: ''
  }
  // layui表单的重新渲染
  function renderForm() {//在这里把重新渲染的功能包装秤一个方法
    layui.use('form', function () {
      var form = layui.form;
      form.render();
    });
  }

  $.ajax({
    url: '/my/article/list',
    data: query,
    success: function (res) {
      console.log(res);
      if (res.status !== 0) {
        return layer.msg('获取文章信息失败！');
      }
      let htmlStr1 = template('artListTpl', res);
      $('tbody').append(htmlStr1);

      let htmlStr2 = template('allCateTpl', res);
      // console.log(htmlStr2);
      $('#allCate').append(htmlStr2);
      let htmlStr3 = template('allStateTpl', res);
      // console.log(htmlStr3);
      $('#allState').append(htmlStr3);
      renderForm();
    }
  })

  $('#allCate').on('click', function () {
    console.log('hh');
  })

  $('body').on('click', '.delBtn', function () {
    $.ajax({
      url: '/my/article/delete/' + $(this).attr('data-id'),
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg('删除文章失败！');
        }
        layer.confirm('确认删除文章？', { icon: 3, title: '删除文章' }, function (index) {
          //do something

          layer.close(index);
        });
      }
    })
  })
})