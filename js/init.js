(function($) {
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

    });
})(jQuery);

var contact = $("#contact").offset();

$(document).ready(function() {
    $(window).scroll(function(){
        var screenPosition = $(document).scrollTop();
        if (screenPosition > contact.top) {
            $( "#calltoaction" ).removeClass( 'disblock' ).addClass( 'disnone' );
        }
        if (screenPosition < contact.top) {
            $( "#calltoaction" ).addClass( 'disblock' ).removeClass( 'disnone' );
        }
    });
});
