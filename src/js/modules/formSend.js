function formSend() {
    document.addEventListener('wpcf7mailsent', function (event) {
        let el = $('#modal-form-tnx');
        if (el.length) {
            $.magnificPopup.open({
                items: {
                    src: el
                },
                type: 'inline',
                fixedContentPos: true,
                fixedBgPos: true,
                overflowY: 'auto',
                closeBtnInside: true,
                preloader: false,
                midClick: true,
                removalDelay: 300,
                mainClass: 'popup-buble',
            });
        }
    }, false);
}