$(document).ready(function() {
    var utmTerm = getUrlVars()["utm_term"];
    var string = String(utmTerm);
    var decoded = decodeURI(string);

    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });
        return vars;
    }

    // более универсальная версия работающего скрипта
    var package1 = ['увольнен',
        'Электронная трудовая книжка',
        'Заполнение при увольнении',
        'Практическая помощь экспертов'
    ];

    var package2 = ['Срок',
        'Электронная трудовая книжка',
        'Все ответы на вопросы о сроках сдачи в 2020 году'];

    var package3 = ['Пример',
        'Электронная трудовая книжка',
        'Примеры заполнения тут',
        'Практическая помощь экспертов'];

    var package4 = ['Форм',
        'Электронная трудовая книжка',
        'Получить актуальную форму и помощь в заполнении'];

    var package5 = ['Образец',
        'Электронная трудовая книжка',
        'Безопасные образцы заполнения',
        'Практическая помощь экспертов'];

    var package6 = ['Образцы',
        'Электронная трудовая книжка',
        'Безопасные образцы заполнения',
        'Практическая помощь экспертов'];

    var package7 = ['Штраф',
        'Электронная трудовая книжка',
        'Все о штрафах, а также работающие рекомендации в сложных ситуациях'];

    var package8 = ['уволил',
        'Электронная трудовая книжка',
        'Заполнение при увольнении',
        'Практическая помощь экспертов'];

    var packages = [package1, package2, package3, package4, package5, package6, package7, package8];

    for (var i = 0; i < packages.length; i = i + 1){
        var package = packages[i];
        var matcher = package[0];
        var pattern = new RegExp(matcher, "gi");
        var title = $("#main-banner__title");
        var subtitle = $("#main-banner__subtitle");
        var forWhat = $("#main-banner__for-what");
        if (decoded.match(pattern)) {
            subtitle.text(package[2]);
            var subcontent = subtitle.html();
            title.html(package[1] + '<br>' + '<span id="main-banner__subtitle" class="main-banner__subtitle">' + subcontent + '</span>');
            if (package[3] != null) {
                forWhat.html(package[3]);
            } else {
                forWhat.html('');
            }
            break
        }
    }
})
