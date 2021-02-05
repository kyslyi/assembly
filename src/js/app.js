let _window = $(window);
let _document = $(document);

$(document).ready(function () {

    function pageReady() {
        // вспомогательные скрипты, библиотеки
        legacySupport();
        imgToSvg();
        formSend();
        activeHeaderScroll();
        // инициализация библиотек
        initSliders();
        initPopups();
        initMasks();
        // initSelectric();
        initLazyPicture();
        // кастомные скрипты
        burgerMenu();
        scrollTop();
        sectionNavigation();
        selectLan();
        headerHeightFun();
        mapScripts();
        // vhModule();
        // inputNumber();
    }

    pageReady();

    window.addEventListener('resize', () => {
        headerHeightFun();
    })

});