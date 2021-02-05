function activeHeaderScroll() {

    let header = $('header.header');
    _window.on('scroll load', function () {
        if (_window.scrollTop() >= 10) {
            header.addClass('active');
        } else {
            header.removeClass('active');
        }
    });

}