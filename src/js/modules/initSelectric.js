function initSelectric() {
    $('select').selectric({
        maxHeight: 300,
        arrowButtonMarkup: '<b class="button"></b>',

        onInit: function (element, data) {
            var $elm = $(element),
                $wrapper = $elm.closest('.' + data.classes.wrapper);

            $wrapper.find('.label').html($elm.attr('placeholder'));
        },
        onBeforeOpen: function (element, data) {
            var $elm = $(element),
                $wrapper = $elm.closest('.' + data.classes.wrapper);

            $wrapper.find('.label').data('value', $wrapper.find('.label').html()).html($elm.attr('placeholder'));
        },
        onBeforeClose: function (element, data) {
            var $elm = $(element),
                $wrapper = $elm.closest('.' + data.classes.wrapper);

            $wrapper.find('.label').html($wrapper.find('.label').data('value'));
        }
    });
}