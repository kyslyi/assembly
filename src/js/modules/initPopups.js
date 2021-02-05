function initPopups() {

    // Magnific Popup
    let startWindowScroll = 0;
    $('.js-popup').magnificPopup({
        type: 'inline',
        fixedContentPos: true,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'popup-buble',
        callbacks: {
            beforeOpen: function () {
                startWindowScroll = _window.scrollTop();
            },
            close: function () {
                _window.scrollTop(startWindowScroll);
            }
        }
    });

    // $.magnificPopup.close();

}