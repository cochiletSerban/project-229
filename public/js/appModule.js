// apend all your componets here

$(function () {
  $.get('header-component/header.html', function (data) {
    $('#header').html(data)
  })
})
