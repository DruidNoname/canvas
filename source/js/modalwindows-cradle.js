$(function () {

    //Согласие на обработку персональных данных
    $(".personal-data-show").on("click", function(){
        $("#personal-data-concent").addClass("active")
    });

    $('.privacy-policy-show').on("click", function(){
        $("#privacy-policy").addClass("active")
    });
//Доп.инфо политика конфиденциальности



// открытие всплывающего окна
    $(document).on('click', '[data-modal-popup]', function (e) {
        e.preventDefault();
        var button = $(this),
            buttonId = button.data('modal-popup')
        $(buttonId).arcticmodal({
            overlay: {
                css: {
                    backgroundColor: 'rgba(0,0,0,.8)',
                    opacity: 1
                }
            }
        });
    });
});