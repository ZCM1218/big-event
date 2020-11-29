$(function () {
  let layer = layui.layer;
  let state = '';
  let form = layui.form;
  // 截取url中的id
  let id = location.search.split('?id=')[1];
  function renderForm() {
    layui.use('form', function () {
      form.render();
    });
  };
  // 获取文章类别
  $.ajax({
    url: '/my/article/cates',
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg('获取文章分类列表失败！');
      }
      // console.log(res);
      let htmlStr = template('artCateTpl', res);
      $('select').append(htmlStr);
      renderForm();
      // 获取到文章类别信息之后要再给表单进行赋值操作
      getArgInfo();
    }
  })
  // 根据id获取文章详情
  function getArgInfo() {
    $.ajax({
      url: '/my/article/' + id,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg('获取文章信息失败！');
        }
        // 初始化富文本编辑器
        initEditor();
        // 修改文章的发布状态
        state = res.data.state;
        form.val('form', res.data);
        // 3. 初始化裁剪区域
        // 通过后台响应的文章详情来更新封面裁剪区域
        // res.data.cover_img ==> 得到的图片没有根路径
        $image
          .attr("src", "http://ajax.frontend.itheima.net" + res.data.cover_img)
          .cropper(options);
      }
    })
  }


  // 1. 初始化图片裁剪器
  let $image = $('#image')

  // 2. 裁剪选项
  let options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 编辑界面不需要这个，因为裁剪区域的图片地址是通过请求该文章的数据来获得的，如果加了这个，就又恢复默认的了
  // 在上面，获取到文章详情之后，通过res.data.cover_img来初始化裁剪区域
  // 3. 初始化裁剪区域
  // $image.cropper(options);

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
        // 添加文章Id
        fd.append('Id', id);
        fd.forEach(item => console.log(item));
        publish(fd);
      })
  })

  // 更新文章，发送请求，fd带上文章Id（一开始跟在url后面的）
  function publish(fd) {
    $.ajax({
      url: '/my/article/edit',
      type: 'POST',
      data: fd,
      contentType: false,
      processData: false,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg('修改文章失败！');
        }
        layer.msg('文章修改成功，即将跳转至文章列表界面！',
          { time: 2000 },
          function () {
            location.href = '/article/art_list.html'
          });
      }
    })
  }

  // 以上内容都是跟发表文章一样的，编辑文章需要的就是根据id获取到此文章的信息，填充到表单中去

})

// 封装函数就会出现富文本编辑器没内容的bug，不封装就会出现文章类别没内容和封面没法显示的bug