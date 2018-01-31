var countDownDate = 1517436000000
var btcWalllet = null
$(function () {

  var hash = window.location.hash.substr(1)
  if (hash) {
    if (hash === 'emailVerified') {
      $('#emailVerified').removeClass('disnone')
      $('#emailVerified').append('<img height="1" width="1" style="display:none" src="https://matchico.com/track-investor/87c734a9-5afb-487d-9355-6bad7f725c30/signup.gif"/>')
      if (yaCounter46855911) {
        yaCounter46855911.reachGoal('verifyEmail')
      }
    }
  }

  var $window = $(window);

  function resize () {
    if ($window.width() < 1280) {
      $('#table').removeClass('table-of-contents');
      $('#featured, #cases, #dapps, #mission, #roadmap, #rewards, #partner, #team, #advisors, #media, #contact').removeClass('scrollspy');
    }
  }

  $window.resize(resize).trigger('resize');

  $('.scrollspy').scrollSpy();

  $('#sbmt').submit(function (e) {
    e.preventDefault();
    $.ajax({
      url: 'https://apimail.ahoolee.io/api/subscribe',
      type: 'post',
      data: $('#sbmt').serialize()
    });
  });

  var clipboardEth = new Clipboard('#wallet_eth_copy');
  clipboardEth.on('success', function (e) {
    $('#wallet_eth_copy_ok').addClass('visible');
  });

  var clipboardBtc = new Clipboard('#wallet_btc_copy');
  clipboardBtc.on('success', function (e) {
    $('#wallet_btc_copy_ok').addClass('visible');
  });

  $('#wallet_eth_copy').on('click', function (e) {
    e.preventDefault();
    var $temp = $('<input>');
    $('body').append($temp);
    $temp.val($('#address_eth_div').text()).select();
    document.execCommand('copy');
    $temp.remove();

    $('#wallet_eth_copy_ok').addClass('visible');
  })

  $('#wallet_btc_copy').on('click', function (e) {
    e.preventDefault();
    var $temp = $('<input>');
    $('body').append($temp);
    $temp.val($('#address_btc_div').text()).select();
    document.execCommand('copy');
    $temp.remove();

    $('#wallet_btc_copy_ok').addClass('visible');
  })

  $('input[name=currency]:radio').change(function () {

    if ($('input[name=currency]:checked').val() == 'eth') {
      $('#input_btc').removeClass('disblock').addClass('disnone');
    }

    if ($('input[name=currency]:checked').val() == 'btc') {
      $('#input_btc').addClass('disblock').removeClass('disnone');
    }
  })
  if ($('#gasprice').length) {
    $.ajax({
      url: 'https://ethgasstation.info/json/ethgasAPI.json',
      dataType: 'json',
      success: function (data) {
        $('#gasprice').html(Math.round(data.average / 10))
      }
    });
  }
  if ($('#timer').length) {
    var curDate = new Date().getTime();

    if (curDate < countDownDate) {
      $('#timerTitle').html('50% bonus at Private Pre-Sale round ends in:')
    } else {
      countDownDate = 1517443200000;
      $('#timerTitle').html('30% bonus at Pre-ICO round stars in:')
      $('#presaleLink').show(0)
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

        $('#timerTitle').html('30% bonus at Pre-ICO round stars in:')
        countDownDate = 1517443200000;
      }
    }, 1000);
  }

  if ($('#userblock').length) {
    getUser(function (err, data) {
      if (data) {
        $('#userblockR').removeClass('disnone')
      } else {
        $('#userblockU').removeClass('disnone')
      }
    })
  }

  getCrowdAddresses(function (err, data) {
    $('#address_eth_div').html(data.eth)
    $('#address_eth_form').val(data.eth)
    $('#address_btc_div').html(data.btc)
    $('#address_btc_form').val(data.btc)

    btcWalllet = data.btc

    if ($('#preico').length) {
      initContract(data.eth)
      updateSmartConrtactData()
    }
    if ($('#eth_qrcode').length) {
      new QRCode(document.getElementById("eth_qrcode"),
        {
          text: 'ethereum:' + data.eth,
          width: 128,
          height: 128,
          correctLevel: QRCode.CorrectLevel.H
        })
      new QRCode(document.getElementById("btc_qrcode"), {
        text: 'bitcoin:' + data.btc,
        width: 128,
        height: 128,
        correctLevel: QRCode.CorrectLevel.H
      })
    }
    getUser(function (err, data2) {
      if (data2 && data2.wallet_eth) {
        getBalance(data.tokenAddress, data2.wallet_eth, function (err, data) {
          if (data) {
            $('#user_token').html(data + ' EEE')
          }
        })
      }
    })
  })

  $('#get_eee_btc').on('click', function () {
    $('#wallet_btc_ok').removeClass('disnone')
    if (yaCounter46855911) {
      yaCounter46855911.reachGoal('getBTC')
    }
  })

  $('#wallet_btc_ok_close').on('click', function () {
    $('#wallet_btc_ok').addClass('disnone')
  })

  $('#get_eee_eth').on('click', function () {
    $('#wallet_eth_ok').removeClass('disnone')
    if (yaCounter46855911) {
      yaCounter46855911.reachGoal('getEEE')
    }
  })

  $('#wallet_eth_ok_close').on('click', function () {
    $('#wallet_eth_ok').addClass('disnone')
  })

  var signup_form = $('#signup_form')
  if (signup_form.length) {
    getUser(function (err, data) {
      if (data) {
        window.location.href = "/profile"
      }
    })
    signup_form.submit(function (e) {
      signup_form.find(':input[type="submit"]').prop('disabled', true)
      e.preventDefault();
      signup_form.find('.error').addClass('disnone')
      signUp($(this).serialize(), function (err, data) {
        if (err) {
          signup_form.find('.error').html(err).removeClass('disnone')
          signup_form.find(':input[type="submit"]').prop('disabled', false)
        } else {
          if (yaCounter46855911) {
            yaCounter46855911.reachGoal('signup')
          }
          window.location.href = "/profile"
        }
      })
    })
  }

  var signin_form = $('#signin_form')
  if (signin_form.length) {
    getUser(function (err, data) {
      if (data) {
        window.location.href = "/profile"
      }
    })
    signin_form.submit(function (e) {
      signin_form.find(':input[type="submit"]').prop('disabled', true)
      e.preventDefault();
      signin_form.find('.error').addClass('disnone')
      signIn($(this).serialize(), function (err, data) {
        if (err) {
          signin_form.find(':input[type="submit"]').prop('disabled', false)
          signin_form.find('.error').html(err).removeClass('disnone')
        } else {
          window.location.href = "/profile"
        }
      })
    })
  }

  var wallet_eth_edit_form = $('#wallet_eth_edit_form')
  if (wallet_eth_edit_form.length) {
    wallet_eth_edit_form.submit(function (e) {
      e.preventDefault();
      setWalletETH($(this).serialize(), function (err, data) {
        location.reload()
      })
    })
  }

  var wallet_btc_edit_form = $('#wallet_btc_edit_form')
  if (wallet_btc_edit_form.length) {
    wallet_btc_edit_form.submit(function (e) {
      e.preventDefault();
      setWalletBTC($(this).serialize(), function (err, data) {
        location.reload()
      })
    })
  }

  var user_round_edit_form = $('#user_round_edit_form')
  if (user_round_edit_form.length) {
    user_round_edit_form.submit(function (e) {
      e.preventDefault();
      setRound($(this).serialize(), function (err, data) {
        location.reload()
      })
    })
  }
  var resend_form = $('#resend_form')
  if (resend_form.length) {
    resend_form.submit(function (e) {
      resend_form.find(':input[type="submit"]').prop('disabled', true)
      e.preventDefault();
      resend_form.find('.error').addClass('disnone')
      resend_form.find('.allok').addClass('disnone')
      sendVerification(function (err, data) {
        if (err) {
          resend_form.find('.error').html(err).removeClass('disnone')
        } else {
          resend_form.find('.allok').removeClass('disnone')
          resend_form.find(':input[type="submit"]').addClass('disnone').prop('disabled', false)
        }
      })
    })
  }

  var profile_data = $('#profile_data')
  if (profile_data.length) {
    profile_data.submit(function (e) {
      e.preventDefault();
      profile_data.find('.error').addClass('disnone')
      profile_data.find(':input[type="submit"]').prop('disabled', true)
      setProfile($(this).serialize(), function (err, data) {
        if (err) {
          profile_data.find('.error').html(err).removeClass('disnone')
          profile_data.find(':input[type="submit"]').prop('disabled', false)
        } else {
          if (yaCounter46855911) {
            yaCounter46855911.reachGoal('setProfile')
          }
          location.reload()
        }
      })
    })
  }

  var questionnaire_form = $('#questionnaire_form')
  if (questionnaire_form.length) {
    questionnaire_form.submit(function (e) {
      e.preventDefault();
      questionnaire_form.find('.error').addClass('disnone')
      questionnaire_form.find(':input[type="submit"]').prop('disabled', true)
      setInfo($(this).serialize(), function (err, data) {
        if (err) {
          questionnaire_form.find('.error').html(err).removeClass('disnone')
          questionnaire_form.find(':input[type="submit"]').prop('disabled', false)
        } else {
          location.reload()
        }
      })
    })
  }

  var profile = $('#profile')
  if (profile.length) {
    getUser(function (err, data) {
      if (err || !data) {
        window.location.href = "/signup"
      } else {
        if (!data.verified && data.email) {
          $('#verification').removeClass('disnone')
        } else {
          if (data.round) {
            $('#wallet_data').removeClass('disnone')
          }
        }

        if (data.email) {
          $('#email').val(data.email).prop("readonly", true)
        }

        if (data.round) {
          if (data.partnerUrl) {
            $('#user_ref').html(data.partnerUrl)
            $('#user_referralCount').html(data.referralCount)
          }

          if (!data.quiz) {
            $('#questionnaire').removeClass('disnone')
          }

          if (data.round == 1) {
            $('#user_round').html('Private Pre-Sale')
            $('#get_eee_eth').removeClass('disnone')
            $('#get_eee_btc').removeClass('disnone')
          }
          if (data.round == 2) {
            $('#user_round').html('Pre-ICO')
          }
          if (data.round == 3) {
            $('#user_round').html('ICO')
          }

          if (data.whitelist) {
            $('#user_round').append('<span class="green"> (You are in whitelist)</span>')
          }

          if (data.wallet_btc) {
            $('#user_wallet_btc').html(data.wallet_btc)
          } else {
            $('#user_wallet_btc').html('none')
          }

          if (data.wallet_eth) {
            $('#user_wallet_eth').html(data.wallet_eth)
          } else {
            $('#user_wallet_eth').html('none')
          }
          $('#profile_data_complete').removeClass('disnone')
        } else {
          $('#profile_data').removeClass('disnone')
          $('#profile_data_fill').removeClass('disnone')
        }
      }
    })
  }

  var resetpass_form = $('#resetpass_form')
  if (resetpass_form.length) {
    resetpass_form.submit(function (e) {
      resetpass_form.find(':input[type="submit"]').prop('disabled', true)
      resetpass_form.find('.error').addClass('disnone')
      resetpass_form.find('.allok').addClass('disnone')
      e.preventDefault();
      sendRecovery($('#email').val(), function (err, data) {
        resetpass_form.find(':input[type="submit"]').prop('disabled', false)
        if (err) {
          resetpass_form.find('.error').html(err).removeClass('disnone')
        } else {
          resetpass_form.find('.allok').removeClass('disnone')
        }
      })
    })
  }
  $('.edit').on('click', function () {
    var parent = $(this).parent()
    parent.addClass('disnone')
    parent.parent().find('span:first-child').addClass('disnone')
    parent.parent().find('form').removeClass('disnone')
    parent.parent().find('form').find('input').focus()
  })

  $('.done').on('click', function () {
    var closest = $(this).closest('form')
    closest.submit()
  })

  $('.cancel').on('click', function () {
    var closest = $(this).closest('form')
    closest.addClass('disnone')
    closest.parent().find('span:first-child').removeClass('disnone')
    closest.parent().children('.line_icon').removeClass('disnone')
  })

  $('#logout_link').on('click', function () {
    signOut(function (err, data) {
      window.location.href = "/"
    })
  })

  var wallet_btc_sent_form = $('#wallet_btc_sent_form')
  if (wallet_btc_sent_form.length) {
    wallet_btc_sent_form.submit(function (e) {
      wallet_btc_sent_form.find(':input[type="submit"]').prop('disabled', true)
      wallet_btc_sent_form.find('.error').addClass('disnone')
      wallet_btc_sent_form.find('.allok').addClass('disnone')
      e.preventDefault();
      checkAddress(function (err, data) {
        wallet_btc_sent_form.find(':input[type="submit"]').prop('disabled', false)
        if (err) {
          wallet_btc_sent_form.find('.error').html(err).removeClass('disnone')
        } else {
          wallet_btc_sent_form.find('.allok').removeClass('disnone')
        }
      })
    })
  }

});

function updateSmartConrtactData () {
  getCap(function (err, cap) {
    if(err){
      setTimeout(updateSmartConrtactData, 10000)
    }
    else if (cap) {
      $('#hardcap_data').html(cap + ' ETH')

      getCollected(function (err, collected) {
        if (collected) {
          $('#balance_data').html(collected + ' ETH')
          $('#percent_number').html(Math.round(collected / cap * 100)  + '%')
          $('#percent_line').width(Math.round(collected / cap * 100)  + '%')
        }
        setTimeout(updateSmartConrtactData, 10000)
      })
    }
  })
}

function checkLoginState () {
  FB.getLoginStatus(function (response) {
    if (response.authResponse && response.authResponse.accessToken) {
      authFacebook(response.authResponse.accessToken, function (err, data) {
        if (err) {
          $('.error').html(err).removeClass('disnone')
        } else {
          window.location.href = "profile.html"
        }
      })
    }
  });
}