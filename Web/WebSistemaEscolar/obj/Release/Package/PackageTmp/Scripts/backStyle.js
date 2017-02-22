(function ($) {
    $(document).ready(function () {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $("body").addClass("fixed-frame-login");
        }

        $.backstretch('Images/back.jpg')
    });
})(this.jQuery);