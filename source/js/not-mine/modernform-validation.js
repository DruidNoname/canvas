function CustomValidation() { }

CustomValidation.prototype = {
    // Установим пустой массив сообщений об ошибках
    invalidities: [],

    // Метод, проверяющий валидность
    checkValidity: function(input) {

        var validity = input.validity;

        if (validity.valueMissing) {
            this.addInvalidity('Ъуъ съуъка');
        }

        if (validity.tooShort) {
            var minL = getAttributeValue(input, 'minlength');
            this.addInvalidity('The minimum value should be ' + minL);
        }

        if (validity.rangeOverflow) {
            var max = getAttributeValue(input, 'max');
            this.addInvalidity('The maximum value should be ' + max);
        }

        if (validity.rangeUnderflow) {
            var min = getAttributeValue(input, 'min');
            this.addInvalidity('The minimum value should be ' + min);
        }
        // И остальные проверки валидности...
    },

    // Добавляем сообщение об ошибке в массив ошибок
    addInvalidity: function(message) {
        this.invalidities.push(message);
    },

    // Получаем общий текст сообщений об ошибках
    getInvalidities: function() {
        return this.invalidities.join('. \n');
    },
};

CustomValidation.prototype.getInvaliditiesForHTML = function() {
    return this.invalidities.join('. <br>');
}

//Добавляем обработчик клика на кнопку отправки формы
var submit = document.getElementById('sendModern');

submit.addEventListener('click', function(e) {
    // Пройдёмся по всем полям
    var inputs = document.getElementsByClassName('modern-form__input');
    for (var i = 0; i < inputs.length; i++) {

        var input = inputs[i];

        // Проверим валидность поля, используя встроенную в JavaScript функцию checkValidity()
        if (input.checkValidity() == false) {

            var inputCustomValidation = new CustomValidation(); // Создадим объект CustomValidation
            inputCustomValidation.checkValidity(input); // Выявим ошибки
            var customValidityMessage = inputCustomValidation.getInvalidities(); // Получим все сообщения об ошибках
            input.setCustomValidity(customValidityMessage); // Установим специальное сообщение об ошибке
            // Добавим ошибки в документ
            var customValidityMessageForHTML = inputCustomValidation.getInvaliditiesForHTML();
            input.insertAdjacentHTML('afterend', '<p class="error-message">' + customValidityMessageForHTML + '</p>')
            stopSubmit = true;

        } // закончился if
    } // закончился цикл
    if (stopSubmit) {
        e.preventDefault();
    }
});
