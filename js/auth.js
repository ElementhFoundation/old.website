var user = null
$(function () {

  var $window = $(window);


})

function getProfile() {
  $.ajax({
    url: 'getProfile',
    dataType: 'json',
    success: function (data) {
      return data
    },
  })
}
