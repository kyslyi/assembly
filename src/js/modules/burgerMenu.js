function burgerMenu() {

    let burger = $('.burger');
    let menu = $('.burger-slide-content');

    $(document).mouseup(function (e) {

        if (burger.is(e.target) || burger.has(e.target).length === 1) {
            if (menu.hasClass('active')) {
                menu.removeClass('active');
                burger.removeClass('active');
            } else {
                menu.addClass('active');
                burger.addClass('active');
            }
        } else if (!menu.is(e.target) && menu.has(e.target).length === 0 && menu.hasClass('active')) {
            menu.removeClass('active');
            burger.removeClass('active');
        }

    });

}