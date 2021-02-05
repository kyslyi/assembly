function headerHeightFun() {
    let headerHeight = document.querySelector('.header').offsetHeight;
    document.documentElement.style.setProperty('--headerHeight', `${headerHeight}px`);
}