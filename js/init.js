(function($) {
    $(function() {

        $('.button-collapse').sideNav();
        $('.carousel').carousel();

        $('#sbmt').submit(function(e) {
            e.preventDefault();
            $.ajax({
                url: 'http://apimail.ahoolee.io/api/subscribe',
                type: 'post',
                data: $('#sbmt').serialize(),
                success: function() {
                    var $toastContent = $('<a href="#contact" class="button" style="position: fixed; z-index: 9999; left: 48%; top: 35%;"><img src="img/details/a_medium.svg" class="angle left top">SUCCESS<img src="img/details/a_medium.svg" class="angle right bottom"></a>')
                    // var $toastContent = $('<div style="position: fixed; z-index: 9999; right: 42%; top: 45%;">I am toast content</div>');
                    Materialize.toast($toastContent, 4000);
        
                    // alert('SUCCESS');
                }
            });
        });

    }); // end of document ready
})(jQuery); // end of jQuery name space