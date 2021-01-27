/**
 * Created by Donskov Maksim on 19.12.2016.
 * contact E-mail: senator92@bk.ru
 */
$(function () {
    // wow анимация
    //var wow = new WOW();
    //wow.init();

    // скролл к якорю
    $(".js__scroll_to").on("click", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 500);
    });




    // маска телефона неработающая дань истории

    // $(document).on('click', 'input[data-tel=true]', function () {
    //     $(this).inputmask("+7 (999) 999-99-99", {showMaskOnHover: false});
    // });


    // пример вызова popup через ajax
    $(document).on('click', '[data-modal]', function (e) {
        e.preventDefault();
        var button = $(this),
            modalTitle = button.data('modal-title'),
            formId = button.data('modal-form-id'),
            formTemplate = button.data('modal-form-template');
        $.arcticmodal({
            overlay: {
                css: {
                    backgroundColor: 'rgba(0,0,0,.8)',
                    opacity: 1
                }
            },
            type: 'ajax',
            url: '/ajax/form.php?modalTitle='+modalTitle+'&formId='+formId+'&formTemplate='+formTemplate
        });
    });

    // спойлер
    // $(document).on('click', '.js__spoiler_button', function (e) {
    //     e.preventDefault();
    //     var content = $('.spoiler__content');
    //     if(content.hasClass('spoiler__content--open')){
    //         $(this).removeClass('spoiler__button--open');
    //         content.removeClass('spoiler__content--open');
    //     } else {
    //         content.addClass('spoiler__content--open');
    //         $(this).addClass('spoiler__button--open');
    //     }
    // });
});

$(window).on('load', function (e) {
    scrollHeader();
    paddingHeader();
    scrollUp('.footer__scroll_top', 200);
});
$(window).on('resize', function (e) {
    scrollHeader();
    paddingHeader();
});

$(window).on('scroll', function (e) {
    scrollHeader();
    paddingHeader();
});

// отступ высоты шапки
function paddingHeader() {
    $('.main').css('padding-top',$('.inner_page .header').outerHeight());
}
// добавление класса шапки при скролле
function scrollHeader() {
    var header = $('.header');
    if($(window).scrollTop() > 0){
        header.addClass('header--scroll');
    } else {
        header.removeClass('header--scroll');
    }
}



function scrollUp(selector, top) {
    var reg = /[.#]+(.*)/,
        selectorName = reg.exec(selector)[1];

    $(window).on('scroll', function (e) {
        if($(window).scrollTop() > top) {
            $(selector).removeClass(selectorName+'--hidden').addClass(selectorName+'--visible');
        } else {
            $(selector).removeClass(selectorName+'--visible').addClass(selectorName+'--hidden');
        }
    });
}


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IERvbnNrb3YgTWFrc2ltIG9uIDE5LjEyLjIwMTYuXHJcbiAqIGNvbnRhY3QgRS1tYWlsOiBzZW5hdG9yOTJAYmsucnVcclxuICovXHJcbiQoZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gd293INCw0L3QuNC80LDRhtC40Y9cclxuICAgIHZhciB3b3cgPSBuZXcgV09XKCk7XHJcbiAgICB3b3cuaW5pdCgpO1xyXG5cclxuICAgIC8vINGB0LrRgNC+0LvQuyDQuiDRj9C60L7RgNGOXHJcbiAgICAkKFwiLmpzX19zY3JvbGxfdG9cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHZhciBpZCA9ICQodGhpcykuYXR0cignaHJlZicpLFxyXG4gICAgICAgICAgICB0b3AgPSAkKGlkKS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiB0b3B9LCA1MDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8g0L7RgdC90L7QstC90L7QuSDRgdC70LDQudC00LXRgFxyXG4gICAgJCgnLmpzX19tX3NsaWRlcicpLnNsaWNrKHtcclxuICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgICAgYXBwZW5kRG90czogJy5qc19fbV9zbGlkZXJfZG90cycsXHJcbiAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG4gICAgICAgIGZhZGU6IHRydWUsXHJcbiAgICAgICAgc3BlZWQ6IDMwMCxcclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgYWRhcHRpdmVIZWlnaHQ6IHRydWVcclxuICAgIH0pO1xyXG5cclxuICAgIC8vINGB0LvQsNC50LTQtdGAINC00LXRgtCw0LvRjNC90L7QuSDRgdGC0YDQsNC90LjRhtGLXHJcbiAgICAkKCcuanNfX2RldGFpbF9zbGlkZXInKS5zbGljayh7XHJcbiAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICAgIGRvdHM6IGZhbHNlLFxyXG4gICAgICAgIHByZXZBcnJvdzogJy5kZXRhaWxfc2xpZGVyX19hcnJvdy0tcHJldicsXHJcbiAgICAgICAgbmV4dEFycm93OiAnLmRldGFpbF9zbGlkZXJfX2Fycm93LS1uZXh0JyxcclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG4gICAgICAgIGZhZGU6IHRydWUsXHJcbiAgICAgICAgc3BlZWQ6IDMwMCxcclxuICAgICAgICBhZGFwdGl2ZUhlaWdodDogdHJ1ZVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gTW9iaWxlIG1lbnVcclxuICAgICQoJy5oZWFkZXJfX21vYmlsZV9tZW51Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBidXR0b24gPSAkKHRoaXMpO1xyXG4gICAgICAgIGlmICgkKCcuaGVhZGVyX19uYXYnKS5jc3MoJ2Rpc3BsYXknKSA9PSAnbm9uZScpIHtcclxuICAgICAgICAgICAgJCgnLmhlYWRlcicpLmFkZENsYXNzKCdoZWFkZXItLW9wZW5kJyk7XHJcbiAgICAgICAgICAgICQoJy5oZWFkZXJfX25hdicpLmFkZENsYXNzKCdoZWFkZXJfX25hdi0tb3BlbmQnKTtcclxuICAgICAgICAgICAgYnV0dG9uLmFkZENsYXNzKCdoZWFkZXJfX21vYmlsZV9tZW51LS1vcGVuZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJy5oZWFkZXInKS5yZW1vdmVDbGFzcygnaGVhZGVyLS1vcGVuZCcpO1xyXG4gICAgICAgICAgICAkKCcuaGVhZGVyX19uYXYnKS5yZW1vdmVDbGFzcygnaGVhZGVyX19uYXYtLW9wZW5kJyk7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5yZW1vdmVDbGFzcygnaGVhZGVyX19tb2JpbGVfbWVudS0tb3BlbmQnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyDQvNCw0YHQutCwINGC0LXQu9C10YTQvtC90LBcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdpbnB1dFtkYXRhLXRlbD10cnVlXScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKHRoaXMpLmlucHV0bWFzayhcIis3ICg5OTkpIDk5OS05OS05OVwiLCB7c2hvd01hc2tPbkhvdmVyOiBmYWxzZX0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8g0L7RgtC60YDRi9GC0LjQtSDQstGB0L/Qu9GL0LLQsNGO0YnQtdCz0L4g0L7QutC90LBcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdbZGF0YS1tb2RhbC1wb3B1cF0nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXIgYnV0dG9uID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgYnV0dG9uSWQgPSBidXR0b24uZGF0YSgnbW9kYWwtcG9wdXAnKTtcclxuICAgICAgICAkKGJ1dHRvbklkKS5hcmN0aWNtb2RhbCh7XHJcbiAgICAgICAgICAgIG92ZXJsYXk6IHtcclxuICAgICAgICAgICAgICAgIGNzczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsLjgpJyxcclxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vINC/0YDQuNC80LXRgCDQstGL0LfQvtCy0LAgcG9wdXAg0YfQtdGA0LXQtyBhamF4XHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnW2RhdGEtbW9kYWxdJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdmFyIGJ1dHRvbiA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIG1vZGFsVGl0bGUgPSBidXR0b24uZGF0YSgnbW9kYWwtdGl0bGUnKSxcclxuICAgICAgICAgICAgZm9ybUlkID0gYnV0dG9uLmRhdGEoJ21vZGFsLWZvcm0taWQnKSxcclxuICAgICAgICAgICAgZm9ybVRlbXBsYXRlID0gYnV0dG9uLmRhdGEoJ21vZGFsLWZvcm0tdGVtcGxhdGUnKTtcclxuICAgICAgICAkLmFyY3RpY21vZGFsKHtcclxuICAgICAgICAgICAgb3ZlcmxheToge1xyXG4gICAgICAgICAgICAgICAgY3NzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLDAsMCwuOCknLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdHlwZTogJ2FqYXgnLFxyXG4gICAgICAgICAgICB1cmw6ICcvYWpheC9mb3JtLnBocD9tb2RhbFRpdGxlPScrbW9kYWxUaXRsZSsnJmZvcm1JZD0nK2Zvcm1JZCsnJmZvcm1UZW1wbGF0ZT0nK2Zvcm1UZW1wbGF0ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8g0YHQv9C+0LnQu9C10YBcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanNfX3Nwb2lsZXJfYnV0dG9uJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdmFyIGNvbnRlbnQgPSAkKCcuc3BvaWxlcl9fY29udGVudCcpO1xyXG4gICAgICAgIGlmKGNvbnRlbnQuaGFzQ2xhc3MoJ3Nwb2lsZXJfX2NvbnRlbnQtLW9wZW4nKSl7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ3Nwb2lsZXJfX2J1dHRvbi0tb3BlbicpO1xyXG4gICAgICAgICAgICBjb250ZW50LnJlbW92ZUNsYXNzKCdzcG9pbGVyX19jb250ZW50LS1vcGVuJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29udGVudC5hZGRDbGFzcygnc3BvaWxlcl9fY29udGVudC0tb3BlbicpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdzcG9pbGVyX19idXR0b24tLW9wZW4nKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG4kKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgc2Nyb2xsSGVhZGVyKCk7XHJcbiAgICBwYWRkaW5nSGVhZGVyKCk7XHJcbiAgICBwb3B1bGFyU2xpZGVyKCk7XHJcbiAgICBzY3JvbGxVcCgnLmZvb3Rlcl9fc2Nyb2xsX3RvcCcsIDIwMCk7XHJcbn0pO1xyXG4kKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBzY3JvbGxIZWFkZXIoKTtcclxuICAgIHBhZGRpbmdIZWFkZXIoKTtcclxuICAgIHBvcHVsYXJTbGlkZXIoKTtcclxufSk7XHJcbiQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIHNjcm9sbEhlYWRlcigpO1xyXG4gICAgcGFkZGluZ0hlYWRlcigpO1xyXG59KTtcclxuLy8g0L7RgtGB0YLRg9C/INCy0YvRgdC+0YLRiyDRiNCw0L/QutC4XHJcbmZ1bmN0aW9uIHBhZGRpbmdIZWFkZXIoKSB7XHJcbiAgICAkKCcubWFpbicpLmNzcygncGFkZGluZy10b3AnLCQoJy5pbm5lcl9wYWdlIC5oZWFkZXInKS5vdXRlckhlaWdodCgpKTtcclxufVxyXG4vLyDQtNC+0LHQsNCy0LvQtdC90LjQtSDQutC70LDRgdGB0LAg0YjQsNC/0LrQuCDQv9GA0Lgg0YHQutGA0L7Qu9C1XHJcbmZ1bmN0aW9uIHNjcm9sbEhlYWRlcigpIHtcclxuICAgIHZhciBoZWFkZXIgPSAkKCcuaGVhZGVyJyk7XHJcbiAgICBpZigkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiAwKXtcclxuICAgICAgICBoZWFkZXIuYWRkQ2xhc3MoJ2hlYWRlci0tc2Nyb2xsJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGhlYWRlci5yZW1vdmVDbGFzcygnaGVhZGVyLS1zY3JvbGwnKTtcclxuICAgIH1cclxufVxyXG52YXIgd2lkdGhXaW5kb3cgPSBmYWxzZTtcclxuZnVuY3Rpb24gcG9wdWxhclNsaWRlcigpIHtcclxuXHJcbiAgICBpZigkKCdib2R5Jykud2lkdGgoKSA8PSA3NjggJiYgIXdpZHRoV2luZG93KXtcclxuICAgICAgICB3aWR0aFdpbmRvdyA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vINGB0LvQsNC50LTQtdGA0Ysg0LIg0LrQvtC80L/QtdGC0LXQvdGG0LjRj9GFXHJcbiAgICAgICAgJCgnLmpzX19wcm9kdWN0cycpLmVhY2goZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICAgICAgdmFyIHBhcmVudCA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIHBhcmVudC5hZGRDbGFzcygnanNfX3Byb2R1Y3RzLS0nK2kpO1xyXG4gICAgICAgICAgICAkKCcucHJvZHVjdHNfX2xpc3QnLHBhcmVudCkuc2xpY2soe1xyXG4gICAgICAgICAgICAgICAgc3BlZWQ6IDkwMCxcclxuICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgcHJldkFycm93OiAnLmpzX19wcm9kdWN0cy0tJytpKycgLnByb2R1Y3RzX19hcnJvdy0tcHJldicsXHJcbiAgICAgICAgICAgICAgICBuZXh0QXJyb3c6ICcuanNfX3Byb2R1Y3RzLS0nK2krJyAucHJvZHVjdHNfX2Fycm93LS1uZXh0JyxcclxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmKCQoJ2JvZHknKS53aWR0aCgpID4gNzY4ICYmIHdpZHRoV2luZG93KSB7XHJcbiAgICAgICAgd2lkdGhXaW5kb3cgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgJCgnLnByb2R1Y3RzX19saXN0Jykuc2xpY2soJ3Vuc2xpY2snKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBzY3JvbGxVcChzZWxlY3RvciwgdG9wKSB7XHJcbiAgICB2YXIgcmVnID0gL1suI10rKC4qKS8sXHJcbiAgICAgICAgc2VsZWN0b3JOYW1lID0gcmVnLmV4ZWMoc2VsZWN0b3IpWzFdO1xyXG5cclxuICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZigkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiB0b3ApIHtcclxuICAgICAgICAgICAgJChzZWxlY3RvcikucmVtb3ZlQ2xhc3Moc2VsZWN0b3JOYW1lKyctLWhpZGRlbicpLmFkZENsYXNzKHNlbGVjdG9yTmFtZSsnLS12aXNpYmxlJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJChzZWxlY3RvcikucmVtb3ZlQ2xhc3Moc2VsZWN0b3JOYW1lKyctLXZpc2libGUnKS5hZGRDbGFzcyhzZWxlY3Rvck5hbWUrJy0taGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0iXSwiZmlsZSI6Im1haW4uanMifQ==



$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

$(function () {
    $('[data-toggle="popover"]').popover()
});

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').focus()
});
