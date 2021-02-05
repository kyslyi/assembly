function inputNumber() {

    let plusInputNumber = document.querySelectorAll('.input-counter__plus');
    let minusInputNumber = document.querySelectorAll('.input-counter__minus');

    let classWrapInputNumber = '.input-counter';
    let classInputNumber = '.input-counter__input';

    plusInputNumber.forEach(current => {
        increment_decrement(current, 'plus');
    });

    minusInputNumber.forEach(current => {
        increment_decrement(current, 'minus');
    });

    function increment_decrement(current, sign) {
        current.addEventListener('click', function(){
            
            let thisWrap = current.closest(classWrapInputNumber);
            let thisInput = thisWrap.querySelector(classInputNumber);

            if(sign == 'plus') {
                thisInput.value++;
            }

            if(sign == 'minus' && thisInput.value > 1) {
                thisInput.value--;
            }

        });
    }

}