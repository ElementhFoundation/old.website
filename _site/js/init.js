$(function () {

  var $window = $(window);

  function resize () {
    if ($window.width() < 1280) {
      $('#table').removeClass('table-of-contents');
      $('#featured, #cases, #dapps, #mission, #roadmap, #rewards, #partner, #team, #advisors, #media, #contact').removeClass('scrollspy');
    }
  }

  $window
    .resize(resize)
    .trigger('resize');

  $(document).ready(function () { $('.scrollspy').scrollSpy(); });

  $('.collapsible').collapsible({expandable: true});
  $('.button-collapse').sideNav();
  $('#wlmodal').modal();

  $('#sbmt').submit(function (e) {
    $('#wlmodal').removeClass('disnone').addClass('disblock');
    e.preventDefault();
    $.ajax({
      url: 'https://apimail.ahoolee.io/api/subscribe',
      type: 'post',
      data: $('#sbmt').serialize()
    });
  });
  $('#whitelist').submit(function (e) {
    $('#whitelist input[name=email]').val($('#sbmt input[name=email]').val());
    e.preventDefault();
    $('#loading').addClass('disblock').removeClass('disnone');
    $.ajax({
      url: 'https://apimail.ahoolee.io/api/invest',
      type: 'post',
      data: $('#whitelist').serialize(),
      success: function () {
        $('#loading').removeClass('disblock').addClass('disnone');
        $('#wlmodal').removeClass('disblock').addClass('disnone');
        $('#wl_ps_ok').addClass('disblock').removeClass('disnone');
      },
      error: function () {
        $('#loading').removeClass('disblock').addClass('disnone');
        $('#wl_ps_error').addClass('disblock').removeClass('disnone');
      }
    });
  });

  $('#wlmodalclose').on('click', function () {
    $('#wlmodal').removeClass('disblock').addClass('disnone');
  })

  $('#calltoaction').on('click', function () {
    $("#youremail").focus();
  })

  var contact = $("#contact").offset();

  $(window).scroll(function () {
    var screenPosition = $(document).scrollTop();
    if (screenPosition > contact.top) {
      $("#calltoaction").removeClass('disblock').addClass('disnone');
    }
    if (screenPosition < contact.top) {
      $("#calltoaction").addClass('disblock').removeClass('disnone');
    }
  });

  $('#wallet').submit(function (e) {
    e.preventDefault();
    $.ajax({
      url: 'https://apimail.ahoolee.io/api/presale?wallet=' + $('#yourwallet').val().trim(),
      type: 'get',
      dataType: 'json'
    }).done(
      function (data) {
        if (data.response.status == 'Error') {
          $('#wallet_error').addClass('disblock').removeClass('disnone');
          $('#wallet_error_msg').html(data.response.message);
        }

        if (data.response.status == 'Ok') {
          if ($('#yourwallet').val().trim().length == 34) {
            // btc
            $('#wallet_btc_ok').addClass('disblock').removeClass('disnone');
            $('#address_btc_div').html(data.response.btc);
            $('#address_btc_form').html(data.response.btc);
          }

          if ($('#yourwallet').val().trim().length == 42) {
            // eth
            $('#wallet_eth_ok').addClass('disblock').removeClass('disnone');
            $('#address_eth_div').html(data.response.eth);
            $('#address_eth_form').html(data.response.eth);

          }
        }

      }).fail(function () {
        $('#wallet_error').addClass('disblock').removeClass('disnone');
        $('#wallet_error_msg').html('Connection error! Please try again.');
      }
    );
  });

  $('#wallet_err_close').on('click', function () {
    $('#wallet_error').removeClass('disblock').addClass('disnone');
  })

  $('#wallet_eth_ok_close').on('click', function () {
    $('#wallet_eth_ok').removeClass('disblock').addClass('disnone');
  })

  $('#wallet_btc_ok_close').on('click', function () {
    $('#wallet_btc_ok').removeClass('disblock').addClass('disnone');
  })

  var clipboardEth = new Clipboard('#wallet_eth_copy');
  clipboardEth.on('success', function (e) {
    $('#wallet_eth_copy_ok').addClass('visible');
  });

  var clipboardBtc = new Clipboard('#wallet_btc_copy');
  clipboardBtc.on('success', function (e) {
    $('#wallet_btc_copy_ok').addClass('visible');
  });

  $('#join_wl').on('click', function () {
    $('#wl_ps').addClass('disblock').removeClass('disnone');
  })

  $('#wl_ps_close').on('click', function () {
    $('#wl_ps').removeClass('disblock').addClass('disnone');
  })

  $('#wl_ps_form').submit(function (e) {
    $('#loading').addClass('disblock').removeClass('disnone');
    e.preventDefault();
    $.ajax({
      url: 'https://apimail.ahoolee.io/api/invest',
      type: 'post',
      data: $('#wl_ps_form').serialize(),
      success: function () {
        $('#loading').removeClass('disblock').addClass('disnone');

        $('#wl_ps_ok').addClass('disblock').removeClass('disnone');
      },
      error: function () {
        $('#loading').removeClass('disblock').addClass('disnone');
        $('#wl_ps_error').addClass('disblock').removeClass('disnone');
      }
    });
  });

  $('#wl_ps_ok_close').on('click', function () {
    $('#wl_ps_ok').removeClass('disblock').addClass('disnone');
    $('#wl_ps').removeClass('disblock').addClass('disnone');
  })
  $('#wl_ps_error_close').on('click', function () {
    $('#wl_ps_error').removeClass('disblock').addClass('disnone');
  })

  $('input[name=currency]:radio').change(function () {

    if ($('input[name=currency]:checked').val() == 'eth') {
      $('#input_btc').removeClass('disblock').addClass('disnone');
    }

    if ($('input[name=currency]:checked').val() == 'btc') {
      $('#input_btc').addClass('disblock').removeClass('disnone');
    }
  })

  if ($('#timer').length) {
    var curDate = new Date().getTime();
    var countDownDate = 1515974400000;

    if (curDate < countDownDate) {
      $('#timerTitle').html('50% bonus at closed pre-sale round starts in:')
    } else {
      countDownDate = 1517443200000;
      $('#timerTitle').html('50% bonus at closed pre-sale round ends in:')
      $('#presaleLink').show(0)
      $('#contactLink').hide(0)
    }

    var x = setInterval(function () {

      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now an the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (hours < 10) {
        hours = '0' + hours
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      if (seconds < 10) {
        seconds = '0' + seconds
      }
      // Display the result in the element with id="demo"

      $('#timer').html(days + "d " + hours + ":" + minutes + ":" + seconds)
      // If the count down is finished, write some text
      if (distance < 0) {

        $('#timerTitle').html('50% bonus at closed pre-sale round ends in:')
        countDownDate = 1517443200000;
        $('#presaleLink').show(0)
        $('#contactLink').hide(0)
      }
    }, 1000);
  }
});