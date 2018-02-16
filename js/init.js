var btcWalllet = null
var balance = 0
var user = null
var crowdAddresses = null

if (window.top !== window.self) {
  document.write = "";
  window.top.location = window.self.location;
  setTimeout(function () {
    document.body.innerHTML = '';
  }, 1);
  window.self.onload = function (evt) {
    document.body.innerHTML = '';
  };
}

$(function () {
  /*
   i18next.use(i18nextXHRBackend).use(i18nextBrowserLanguageDetector).init({
   'debug': true,
   'fallbackLng': 'en',
   backend: {
   // load from i18next-gitbook repo
   loadPath: '/locales/{{lng}}/{{ns}}.json',
   crossDomain: true
   }
   }, function(err, t) {
   jqueryI18next.init(i18next, $);
   $('body').localize()
   });
   */

  var hash = window.location.hash.substr(1)
  if (hash) {
    if (hash === 'emailVerified') {
      $('#emailVerified').removeClass('disnone')
      $('#emailVerified').append('<img height="1" width="1" style="display:none" src="https://matchico.com/track-investor/87c734a9-5afb-487d-9355-6bad7f725c30/signup.gif"/>')
      $('#emailVerified').append('<!-- Reddit Conversion Pixel --> <script>var i=new Image();i.src="https://alb.reddit.com/snoo.gif?q=CAAHAAABAAoACQAAAAEHsCU6AA==&s=HHUkLOGwK4RVah69HdhkQ7g5rR0_Cf0mSb0oOKK9eBw=";</script><noscript><img height="1" width="1" style="display:none" src="https://alb.reddit.com/snoo.gif?q=CAAHAAABAAoACQAAAAEHsCU6AA==&s=HHUkLOGwK4RVah69HdhkQ7g5rR0_Cf0mSb0oOKK9eBw="/></noscript><!-- DO NOT MODIFY --> <!-- End Reddit Conversion Pixel -->')

      if (typeof yaCounter46855911 !== 'undefined') {
        yaCounter46855911.reachGoal('verifyEmail')
      }
    }
  }

  getAddress(function (err, data) {
    crowdAddresses = data
    getProfile(function (err, data) {
      user = data
      if (user && user.wallet_eth) {
        getBalance(crowdAddresses.tokenAddress, user.wallet_eth, function (err, data) {
          balance = data
          init()
        })
      } else {
        init()
      }
    })
  })

});

function updateSmartConrtactData () {
  getCap(function (err, cap) {
    if (err) {
      setTimeout(updateSmartConrtactData, 10000)
    }
    else if (cap) {
      $('#hardcap_data').html(cap + ' ETH')

      getCollected(function (err, collected) {
        if (collected) {
          $('#balance_data').html(collected + ' ETH')
          $('#percent_number').html(Math.round(collected / cap * 100) + '%')
          $('#percent_line').width(Math.round(collected / cap * 100) + '%')
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
          window.location.href = "/profile"
        }
      })
    }
  })
}

function init () {

  if ($('#userblock').length) {
    if (user) {
      $('#userblockR').removeClass('disnone')
    } else {
      $('#userblockU').removeClass('disnone')
    }
  }
  var profile_tabs = $('#profile_tabs')
  if (profile_tabs.length) {
    if (user) {
      if(user.verified) {
        if (typeof yaCounter46855911 !== 'undefined') {
          yaCounter46855911.setUserID(user.id)
          yaCounter46855911.userParams({
            country: user.country,
            wallet_btc: user.wallet_btc,
            wallet_eth: user.wallet_eth,
            referral: user.referral
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
                $('#questionnaire').addClass('disnone')
              }
            })
          })
        }
        if (!user.quiz) {
          $('#questionnaire').removeClass('disnone')
        }
        $('#airdrop_check').on('click', function () {
          $('#loading').removeClass('disnone')
          checkAirdrop(function (err,data) {
            $('#loading').addClass('disnone')
            if(data.airdrop) {
              $('#user_referral_airdrop_count').html(data.referralAirdropCount)
              $('#airdrop_yes').removeClass('disnone')
              $('#airdrop_check').addClass('disnone')
              if (typeof yaCounter46855911 !== 'undefined') {
                yaCounter46855911.reachGoal('airdropYes')
              }
            }else{
              $('#airdrop_no').removeClass('disnone')
            }
          })
        })
        profile_tabs.removeClass('disnone')
        $('#user_username').html(user.username)
        $('#user_email').html(user.email)
        $('#user_telegram').html(user.telegram_username)
        $('#user_wallet_btc').html(user.wallet_btc)
        $('#user_wallet_eth').html(user.wallet_eth)
        $('#user_country').html(user.country)
        $('#unique_referral_link_input').val(user.partnerUrl)
        $('#unique_airdrop_link_input').val(user.partnerUrl)
        $('#user_referral_count').html(user.referralCount)
        $('#user_referral_airdrop_count').html(user.referralAirdropCount)
        $('#airdrop_join_telegram').attr("href", user.telegram_secret)
        if(user.referralAirdropCount > 0){
          $('#user_referral_airdrop_count').html(user.referralAirdropCount)
          $('#airdrop_yes').removeClass('disnone')
          $('#airdrop_check').addClass('disnone')
        }
        new Clipboard('#unique_referral_link_copy').on('success', function (e) {
          $('#unique_referral_link_copy').addClass('disnone')
          $('#unique_referral_link_copied').addClass('disblock')
        });

        new Clipboard('#unique_airdrop_link_copy').on('success', function (e) {
          $('#unique_airdrop_link_copy').addClass('disnone')
          $('#unique_airdrop_link_copied').addClass('disblock')
        });
      }else{
        if(user.email) {
          $('#verification').removeClass('disnone')
        }else{
          $('#addemail_div').removeClass('disnone')
          var user_email_edit_form = $('#user_email_edit_form')
          user_email_edit_form.submit(function (e) {
            user_email_edit_form.find(':input[type="submit"]').prop('disabled', true)
            e.preventDefault();
            user_email_edit_form.find('.error').addClass('disnone')
            console.log(user_email_edit_form.serialize())
            setEmail(user_email_edit_form.serialize(), function (err, data) {
              if (err) {
                user_email_edit_form.find('.error').html(err).removeClass('disnone')
                user_email_edit_form.find(':input[type="submit"]').prop('disabled', false)
              } else {
                window.location.href = "/profile"
              }
            })
          })
        }
      }
    }else{
      window.location.href = "/signup"
    }
  }

  $('#address_eth_div').html(crowdAddresses.eth)
  $('#address_eth_form').val(crowdAddresses.eth)
  $('#address_btc_div').html(crowdAddresses.btc)
  $('#address_btc_form').val(crowdAddresses.btc)

  btcWalllet = crowdAddresses.btc

  if ($('#preico').length) {
    initContract(crowdAddresses.eth)
    updateSmartConrtactData()
  }
  if ($('#eth_qrcode').length) {
    new QRCode(document.getElementById("eth_qrcode"),
      {
        text: 'ethereum:' + crowdAddresses.eth,
        width: 128,
        height: 128,
        correctLevel: QRCode.CorrectLevel.H
      })
    new QRCode(document.getElementById("btc_qrcode"), {
      text: 'bitcoin:' + crowdAddresses.btc,
      width: 128,
      height: 128,
      correctLevel: QRCode.CorrectLevel.H
    })
  }

  var $window = $(window);

  function resize () {
    if ($window.width() < 1280) {
      $('#table').removeClass('table-of-contents');
      $('#features, #cases, #dapps, #mission, #market, #roadmap, #rating, #product, #rewards, #partner, #team, #advisors, #media, #competitors, #meetup, #reviews, #faq, #contact').removeClass('scrollspy');
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

  $('#get_eee_btc').on('click', function () {
    $('#wallet_btc_ok').removeClass('disnone')
    if (typeof yaCounter46855911 !== 'undefined') {
      yaCounter46855911.reachGoal('getBTC')
    }
  })

  $('#wallet_btc_ok_close').on('click', function () {
    $('#wallet_btc_ok').addClass('disnone')
  })

  $('#get_eee_eth').on('click', function () {
    $('#wallet_eth_ok').removeClass('disnone')
    if (typeof yaCounter46855911 !== 'undefined') {
      yaCounter46855911.reachGoal('getEEE')
    }
  })

  $('#wallet_eth_ok_close').on('click', function () {
    $('#wallet_eth_ok').addClass('disnone')
  })

  var signup_form = $('#signup_form')
  if (signup_form.length) {
    if (user) {
      window.location.href = "/profile"
    }
    signup_form.submit(function (e) {
      signup_form.find(':input[type="submit"]').prop('disabled', true)
      e.preventDefault();
      signup_form.find('.error').addClass('disnone')
      signUp($(this).serialize(), function (err, data) {
        if (err) {
          signup_form.find('.error').html(err).removeClass('disnone')
          signup_form.find(':input[type="submit"]').prop('disabled', false)
        } else {
          if (typeof yaCounter46855911 !== 'undefined') {
            yaCounter46855911.reachGoal('signup')
          }
          window.location.href = "/profile"
        }
      })
    })
  }

  var signin_form = $('#signin_form')
  if (signin_form.length) {
    if (user) {
      window.location.href = "/profile"
    }
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
    $(this).addClass('disnone')
    parent.parent().find('span:first-child').addClass('disnone')
    parent.parent().find('form').removeClass('disnone')
    parent.parent().find('form').find('input').focus().val(parent.parent().find('span:first-child').html())
    parent.parent().find('.verify').addClass('disnone')
  })

  $('.ajaxForm').submit(function (e) {
    e.preventDefault()
    var action = $(this).attr('action')
    var form = $(this)
    $('#loading').removeClass('disnone')
    window[action](form.serialize(), function (err, data) {
      $('#loading').addClass('disnone')
      if(err){
        $('#error').removeClass('disnone')
        $('#error_msg').html(err)
      }else {
        user = data
        if (typeof yaCounter46855911 !== 'undefined') {
          yaCounter46855911.userParams({
            country: user.country,
            wallet_btc: user.wallet_btc,
            wallet_eth: user.wallet_eth,
            referral: user.referral
          })
        }
        form.addClass('disnone')
        form.parent().find('span:first-child').removeClass('disnone')
        form.parent().children('.edit').removeClass('disnone')
        form.parent().children('.verify').removeClass('disnone')
        form.parent().children('span:first-child').html(form.find('input').val())
      }
    })
  })

  $('#err_close').on('click', function () {
    $('#error').addClass('disnone')
  })

  $('.done').on('click', function () {
    $(this).closest('form').submit()
  })

  $('.cancel').on('click', function () {
    var closest = $(this).closest('form')
    closest.addClass('disnone')
    closest.parent().find('span:first-child').removeClass('disnone')
    closest.parent().children('.edit').removeClass('disnone')
    closest.parent().children('.verify').removeClass('disnone')
  })

  $('#logout_link').on('click', function () {
    signOut(function (err, data) {
      window.location.href = "/"
    })
  })

  var kyc_form = $('#kyc_form')
  if (kyc_form.length) {

    if (user && user.kyc == false && balance == 0) {
      getToken(function (err, token) {
        if (err) {
          //alert(err)
        } else {
          kyc_form.removeClass('disnone')
          kyc_form.submit(function (e) {
            kyc_form.addClass('disnone')
            e.preventDefault();
            var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
            var eventer = window[eventMethod];
            var messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';
            $('#kyc').html('<iframe frameborder="0" width="100%" id="iframe" src="https://api.sumsub.com/idensic/index.html"></iframe>')
            $('#kyc').removeClass('disnone')
            var iframe = document.getElementById('iframe')
            eventer(messageEvent, function (e) {
              var data = e.message || e.data;
              if (!data.method) {
                return;
              }
              if (data.method == 'idCheck.onReady') {
                var conf = {
                  accessToken: token,
                  userId: user.id,
                  applicantId: user.applicant_id,
                  createApplicantPage: true,
                  requiredDocuments: "IDENTITY:PASSPORT,ID_CARD,DRIVERS;SELFIE:SELFIE;PROOF_OF_RESIDENCE:UTILITY_BILL",
                }
                conf.method = 'idCheck.init';
                iframe.contentWindow.postMessage(conf, '*');
              } else if (data.method == 'idCheck.onResize') {
                iframe.height = data.height;
                if ('width' in data) {
                  iframe.width = data.width;
                }
              } else if (data.method == 'idCheck.onCancel') {
              } else if (data.method == 'idCheck.onSuccess') {
              } else if (data.method == 'idCheck.onApplicantCreated') {
                setApplicant({applicantId: data.applicantId, token: token}, function (err, data) {

                })
              }
            }, false);
          })
        }
      })
    }else{
      $('#forAdopters').removeClass('disnone')
      $('#user_token').html(balance + ' EEE')
      if (balance > 0) {
        $('#howToWatchEEE').removeClass('disnone')
        $('#investors_chat').removeClass('disnone')
      }
    }
  }
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

  $('#loading').addClass('disnone')
}