$(function () {
  let layer = layui.layer;
  let form = layui.form;
  getCate();
  function getCate() {
    $.ajax({
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          layer.msg('获取文章分类信息失败！');
        }
        // console.log(res);
        let htmlStr = template('tpl', res);
        // console.log(htmlStr);
        $('#tbody').html(htmlStr);
      }
    })
  }
  // 添加
  let index;
  $('.addBtn').on('click', function () {
    index = layer.open({
      type: 1,
      area: '500px',
      title: '添加文章分类',
      content: $('.addForm').html()
    });
  })
  $('body').on('submit', '#addForm', function (e) {
    e.preventDefault();
    $.ajax({
      url: '/my/article/addcates',
      type: 'POST',
      data: $('#addForm').serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('新增文章分类失败！');
        }
        layer.msg('新增文章分类成功！');
        layer.close(index);
        getCate();
      }
    })
  })
  // 修改
  $('body').on('click', '.editBtn', function () {
    console.log($(this).attr('dataId'));
    index = layer.open({
      type: 1,
      area: '500px',
      title: '修改文章分类',
      content: $('.editForm').html()
    })
    $.ajax({
      url: '/my/article/cates/' + $(this).attr('dataId'),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取书籍信息失败！');
        }
        console.log(res);
        form.val('formTest', {
          'Id': res.data.Id,
          'name': res.data.name,
          'alias': res.data.alias
        });
      }
    })
  })
  $('body').on('submit', '#editForm', function (e) {
    e.preventDefault();
    $.ajax({
      url: '/my/article/updatecate',
      type: 'POST',
      data: $('#editForm').serialize(),
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg('修改文章分类失败！');
        }
        layer.msg('修改文章分类成功！');
        layer.close(index);
        getCate();
      }
    })
  })
  // 删除
  $('body').on('click', '.delBtn', function () {
    $.ajax({
      url: '/my/article/deletecate/' + $(this).attr('dataId'),
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg('删除文章分类失败！');
        }
        layer.confirm('确认删除吗？', { icon: 3, title: '删除分类' }, function (index) {
          //do something
          layer.msg('删除文章分类成功！');
          layer.close(index);
          getCate();
        });
      }
    })
  })
})