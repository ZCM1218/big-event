$(function () {
  let layer = layui.layer;
  let state = '';
  let form = layui.form;
  function renderForm() {
    layui.use('form', function () {
      form.render();
    });
  };
  $.ajax({
    url: '/my/article/cates',
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg('获取文章分类列表失败！');
      }
      console.log(res);
      let htmlStr = template('artCateTpl', res);
      $('select').append(htmlStr);
      renderForm();
    }
  })

  // 初始化富文本编辑器
  initEditor();

  // 1. 初始化图片裁剪器
  let $image = $('#image')

  // 2. 裁剪选项
  let options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options);

  // 当文件域表单发生改变的时候的事件处理程序
  $('.chooseCover').on('click', function () {
    $('[type=file]').click();
  });
  $('[type=file]').on('change', function () {
    // console.log('hh');
    // console.dir(this);
    let file = this.files[0];
    let newImgUrl = URL.createObjectURL(file);
    $image
      .cropper('destroy')
      .attr('src', newImgUrl)
      .cropper(options);
  })

  // 处理状态
  $('#publish').on('click', function () {
    state = '已发布';
  })
  $('#demo').on('click', function () {
    state = '草稿';
  })

  // 在获取整个表单的数据之后再处理图片
  $('.layui-form').on('submit', function (e) {
    e.preventDefault();
    $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280,
      })
      .toBlob((blob) => {
        // 注意：formData也要表单标签有name属性
        // 利用箭头函数没有this指向，会向外找，正好找到form
        let fd = new FormData(this);
        fd.append("state", state);
        fd.append("cover_img", blob);
        fd.forEach(item => console.log(item));
        publish(fd);
      })
  })

  function publish(fd) {
    $.ajax({
      url: '/my/article/add',
      type: 'POST',
      data: fd,
      contentType: false,
      processData: false,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg('发表文章失败！');
        }
        layer.msg('文章发布成功，即将跳转至文章列表界面！',
          { time: 2000 },
          function () {
            location.href = '/article/art_list.html'
          });
      }
    })
  }
})