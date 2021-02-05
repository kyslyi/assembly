function scrollTop() {
    _window.scroll(function () {
        if ($(this).scrollTop() > 250) {
            $('#back-top').fadeIn(300);
        } else {
            $('#back-top').fadeOut(300);
        }
    });

    $('#back-top').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 750);
        return false;
    });
}