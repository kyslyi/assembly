function getElIndex(el) {
    for (var i = 0; el = el.previousElementSibling; i++);
    return i;
}