$(function () {
  let layer = layui.layer;
  let form = layui.form;
  let laypage = layui.laypage;
  let query = {
    pagenum: 1,
    pagesize: 3,
    cate_id: '',
    state: ''
  }
  // 获取文章类别列表，如果通过 文章列表 获取文章类别，会有重复的
  $.ajax({
    url: '/my/article/cates',
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg('获取文章信息失败！');
      }
      res.data.forEach(function (item) {
        let htmlStr1 = `<option value="${item.Id}">${item.name}</option>`;
        $('#allCate').append(htmlStr1);
      })
      form.render();
    }
  })

  // 根据分类和状态筛选
  $('.layui-form').on('submit', function (e) {
    e.preventDefault();
    // console.log('hh');
    query.cate_id = $('[name = cate_id]').val();
    query.state = $('[name = state]').val();
    getArtList();
  })


  // 获取文章列表信息
  getArtList();
  function getArtList() {
    $.ajax({
      url: '/my/article/list',
      data: query,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          layer.msg('获取文章列表信息失败！');
        }
        let htmlStr = template('artListTpl', res);
        $('tbody').empty();
        $('tbody').append(htmlStr);
        renderPage(res.total);
      }
    })
  }

  // 分页
  function renderPage(total) {
    //执行一个laypage实例
    laypage.render({
      curr: query.pagenum,
      limit: query.pagesize,
      elem: 'artList', //注意，这里的 test1 是 ID，不用加 # 号
      count: total, //数据总数，从服务端得到
      limits: [1, 2, 3, 4, 5],
      layout: ["count", "limit", "prev", "page", "next", "skip"],
      // 回调函数
      jump: function (obj, first) {
        //obj包含了当前分页的所有参数，比如：
        console.log(obj.curr);
        //得到当前页，以便向服务端请求对应页的数据。
        query.pagenum = obj.curr;
        console.log(obj.limit);
        //得到每页显示的条数
        query.pagesize = obj.limit;
        // 先配置数据，再进行渲染
        // 注意：只有在点击了其他页之后才进行渲染，否则会重复发送请求进行渲染
        if (!first) {
          // 点击的时候会让if成立
          // console.log("点击了");
          getArtList();
        }
      }
    });
  }

  // 点击删除按钮获取Id，根据Id来发送删除文章的请求
  $('body').on('click', '.delBtn', function () {
    console.log($(this).attr('data-id'));
    $.ajax({
      url: '/my/article/delete/' + $(this).attr('data-id'),
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg('删除文章失败！');
        }
        layer.confirm('确认删除文章？', { icon: 3, title: '删除文章' }, function (index) {
          //do something
          // 判断，如果最后一页只有一篇文章，删除之后自动跳到前一页，否则会停留在没有数据的最后一页
          if (($('.delBtn')).length === 1) {
            query.pagenum = query.pagenum - 1;
          }
          getArtList();
          layer.close(index);
        });
      }
    })
  })
  // 编辑文章
  $('body').on('click', '.editBtn', function () {
    // console.log('hh');
    // 在这个页面发送的请求获取到的数据不能在其他页面使用，需要跳转页面之后，再根据id来获取文章详情
    // 因为跳转到编辑界面之后，不能获取到此文章的id了，所以要将id保存起来，对于比较少的数据可以拼接在url后面了
    location.href = '/article/art_edit.html?id=' + $(this).attr('data-id');
    // console.log($(this).attr('data-id'));
  })


})