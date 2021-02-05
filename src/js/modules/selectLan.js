function selectLan() {
    let selectLanElem = document.querySelector('.header__lan');
    let currentLan = selectLanElem.querySelector('a[href="#"]');
    let title = currentLan.getAttribute('title');
    currentLan.textContent = title;
    currentLan.style.opacity = '1';
    selectLanElem.querySelector(`.sub-menu a[title="${title}"]`).closest('li').style.display = 'none';
}