$(function() {
    var $window = $(window);

    function resize() {
        if ($window.width() < 1280) {
            $('#table').removeClass('table-of-contents');
            $('#featured, #cases, #dapps, #mission, #roadmap, #rewards, #partner, #team, #advisors, #media, #contact').removeClass('scrollspy');
        }
    }

    $window
        .resize(resize)
        .trigger('resize');

        $(document).ready(function(){ $('.scrollspy').scrollSpy(); });


        $('.collapsible').collapsible({ expandable: true });
        $('.button-collapse').sideNav();
        $('#wlmodal').modal();

        $('#sbmt').submit(function(e) {
            $('#wlmodal').removeClass( 'disnone' ).addClass( 'disblock' );
            e.preventDefault();
            $.ajax({
                url: 'https://apimail.ahoolee.io/api/subscribe',
                type: 'post',
                data: $('#sbmt').serialize()
            });
        });
        $('#whitelist').submit(function(e) {
            $('#whitelist input[name=email]').val($('#sbmt input[name=email]').val());
            e.preventDefault();
            $.ajax({
                url: 'https://apimail.ahoolee.io/api/invest',
                type: 'post',
                data: $('#whitelist').serialize(),
                success: function(){
                    $('#wlmodal').removeClass( 'disblock' ).addClass( 'disnone' );
                    Materialize.toast('<div class="button"><img src="img/details/a_medium.svg" class="angle left top">SUCCESS<img src="img/details/a_medium.svg" class="angle right bottom"></div>', 2000);
                }
            });
        });

        $('#wlmodalclose').on('click', function() {
            $('#wlmodal').removeClass( 'disblock' ).addClass( 'disnone' );
        })

        $('#calltoaction').on('click', function() {
            $( "#youremail" ).focus();
        })


var contact = $("#contact").offset();

    $(window).scroll(function(){
        var screenPosition = $(document).scrollTop();
        if (screenPosition > contact.top) {
            $( "#calltoaction" ).removeClass( 'disblock' ).addClass( 'disnone' );
        }
        if (screenPosition < contact.top) {
            $( "#calltoaction" ).addClass( 'disblock' ).removeClass( 'disnone' );
        }
    });

    if($('#timer').length) {
      var curDate = new Date().getTime();
      var countDownDate = 1515974400000;
      if (curDate < 1515974400000) {
        $('#timerTitle').html('50% bonus at closed pre-sale round starts in:')
      } else {
        countDownDate = 1517443200000;
        $('#timerTitle').html('50% bonus at closed pre-sale round ends in:')

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
          clearInterval(x);
        }
      }, 1000);
    }
});