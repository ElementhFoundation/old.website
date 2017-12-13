(function($) {
    $(function() {

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
                url: 'https://apimail.ahoolee.io/api/subscribe',
                type: 'post',
                data: $('#whitelist').serialize(),
                success: function(){
                    $('#wlmodal').removeClass( 'disblock' ).addClass( 'disnone' );
                }
            });
        });

        $('#wlmodalclose').on('click', function() {
            $('#wlmodal').removeClass( 'disblock' ).addClass( 'disnone' );
        })

    });
})(jQuery);