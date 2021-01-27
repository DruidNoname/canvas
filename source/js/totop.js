

$(document).ready(function(){
    /**
     * При прокрутке страницы, показываем или скрываем кнопку
     */
    $(window).scroll(function () {
        // Если отступ сверху больше 450px то показываем кнопку "Наверх"
        if ($(this).scrollTop() > 450) {
            $('#scrollup').fadeIn();
        } else {
            $('#scrollup').fadeOut();
        }
    });

    /** При нажатии на кнопку мы перемещаемся к началу страницы */
    $('#scrollup').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });

});