window.addEventListener("DOMContentLoaded", function() {
    var keyCode;

    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 11)event.preventDefault();
        var matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    var input = document.querySelector("tel-modern");
    // input.addEventListener("input", mask, false); //это вообще непонятно, зачем тут, не работает
    input.addEventListener("focus", mask, false);//событие срабатывает при фокусе на инпут, а также блин при любом изменении внутри инпута
    input.addEventListener("blur", mask, false);//событие срабатывает при потере фокуса инпутом
    input.addEventListener("keydown", mask, false);//событие срабатывает при попытке нажать энтер в инпуте (типа переходя на другую строку), а также блин при любом изменении внутри инпута

});

// input.setCustomValidity('Введите телефон');


// var form = document.getElementById("modern-form");
// form.addEventListener('submit', lagger, false);

