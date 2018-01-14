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
        $('#loading').addClass( 'disblock' ).removeClass( 'disnone' );
        $.ajax({
            url: 'https://apimail.ahoolee.io/api/invest',
            type: 'post',
            data: $('#whitelist').serialize(),
            success: function(){
                $('#loading').removeClass( 'disblock' ).addClass( 'disnone' );
                $('#wlmodal').removeClass( 'disblock' ).addClass( 'disnone' );
                $('#wl_ps_ok').addClass( 'disblock' ).removeClass( 'disnone' );
            },
            error: function () {
                $('#loading').removeClass( 'disblock' ).addClass( 'disnone' );
                $('#wl_ps_error').addClass( 'disblock' ).removeClass( 'disnone' );
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

    $(document).ready(function() {
        $(window).scroll(function(){
            var screenPosition = $(document).scrollTop();
            if (contact && screenPosition > contact.top) {
                $( "#calltoaction" ).removeClass( 'disblock' ).addClass( 'disnone' );
            }
            if (contact && screenPosition < contact.top) {
                $( "#calltoaction" ).addClass( 'disblock' ).removeClass( 'disnone' );
            }
        });
    });


    $('#wallet').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: 'https://apimail.ahoolee.io/api/presale?wallet=' + $('#yourwallet').val(),
            type: 'get',
            dataType: 'json'
        }).done(
            function(data) {
                if(data.response.status == 'Error'){
                    $('#wallet_error').addClass( 'disblock' ).removeClass( 'disnone' );
                    $('#wallet_error_msg').html(data.response.message);
                }

                if(data.response.status == 'Ok'){
                    if($('#yourwallet').val().length == 34) {
                        // btc
                        $('#wallet_btc_ok').addClass( 'disblock' ).removeClass( 'disnone' );
                        $('#address_btc_div').html(data.response.btc);
                    }

                    if($('#yourwallet').val().length == 42) {
                        // eth
                        $('#wallet_eth_ok').addClass( 'disblock' ).removeClass( 'disnone' );
                        $('#address_eth_div').html(data.response.eth);
                    }
                }

            }).fail( function() {
                $('#wallet_error').addClass( 'disblock' ).removeClass( 'disnone' );
                $('#wallet_error_msg').html('Connection error! Please try again.');
            }

        );
    });

    $('#wallet_err_close').on('click', function(){
        $('#wallet_error').removeClass( 'disblock' ).addClass( 'disnone' );
    })

    $('#wallet_eth_ok_close').on('click', function(){
        $('#wallet_eth_ok').removeClass( 'disblock' ).addClass( 'disnone' );
    })

    $('#wallet_btc_ok_close').on('click', function(){
        $('#wallet_btc_ok').removeClass( 'disblock' ).addClass( 'disnone' );
    })

    $('#wallet_eth_copy').on('click', function(e) {
        e.preventDefault();
        var $temp = $('<input>');
        $('body').append($temp);;
        $temp.val($('#address_eth_div').text()).select();
        document.execCommand('copy');
        $temp.remove();

        $('#wallet_eth_copy_ok').addClass('visible');
    })

    $('#wallet_btc_copy').on('click', function(e) {
        e.preventDefault();
        var $temp = $('<input>');
        $('body').append($temp);;
        $temp.val($('#address_btc_div').text()).select();
        document.execCommand('copy');
        $temp.remove();

        $('#wallet_btc_copy_ok').addClass('visible');
    })

    $('#join_wl').on('click', function(){
        $('#wl_ps').addClass( 'disblock' ).removeClass( 'disnone' );
    })

    $('#wl_ps_close').on('click', function(){
        $('#wl_ps').removeClass( 'disblock' ).addClass( 'disnone' );
    })

    $('#wl_ps_form').submit(function(e) {
        $('#loading').addClass( 'disblock' ).removeClass( 'disnone' );
        e.preventDefault();
        $.ajax({
            url: 'https://apimail.ahoolee.io/api/invest',
            type: 'post',
            data: $('#wl_ps_form').serialize(),
            success: function(){
                $('#loading').removeClass( 'disblock' ).addClass( 'disnone' );

                $('#wl_ps_ok').addClass( 'disblock' ).removeClass( 'disnone' );
            },
            error: function () {
                $('#loading').removeClass( 'disblock' ).addClass( 'disnone' );
                $('#wl_ps_error').addClass( 'disblock' ).removeClass( 'disnone' );
            }
        });
    });

    $('#wl_ps_ok_close').on('click', function(){
        $('#wl_ps_ok').removeClass( 'disblock' ).addClass( 'disnone' );
        $('#wl_ps').removeClass( 'disblock' ).addClass( 'disnone' );
    })
    $('#wl_ps_error_close').on('click', function(){
        $('#wl_ps_error').removeClass( 'disblock' ).addClass( 'disnone' );
    })

    $('input[name=currency]:radio').change(function () {

        if($('input[name=currency]:checked').val() == 'eth'){
            $('#input_btc').removeClass( 'disblock' ).addClass( 'disnone' );
        }

        if($('input[name=currency]:checked').val() == 'btc'){
            $('#input_btc').addClass( 'disblock' ).removeClass( 'disnone' );
        }
    })





});