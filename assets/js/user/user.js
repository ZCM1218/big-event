$(function () {
  let form = layui.form;
  $.ajax({
    url: '/my/userinfo',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
    success: function (res) {
      console.log(res);
      form.val('formTest', res.data)
    }
  })
})