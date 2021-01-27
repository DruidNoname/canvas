<?php
// Smart Ajax Configuration File

// Parameters
// List of types:
// all : Everything and anything
// telephone : Telephone number
// number : Integer
// float : Fractional number
// notempty : Everything and anything, but not empty

$VALUES = array(
    "name" => "all",
    "tel" => "all",
    "mail" => "all",
    "formName" => "all",

);
$HTML = 'Имя: %name%<br/> 
Телефон: %tel%<br/>
Email: %mail%<br/>
Форма: %formName%<br/>
';

// Recipients
// Supports one or more recipient separated by comma
$to = "g.fedorova@elcode.ru, Laricheva@elcode.ru, E.V.Alexeeva@elcode.ru, Holin@elcode.ru, Lobanova@elcode.ru, M.Kuznetsova@elcode.ru, lead@elcode.ru, Ignatov@elcode.ru, R.Boykov@elcode.ru, lesnayazhen@gmail.com, lshapoklyak@yandex.ru";

// Subject of mail
$subject = "Конструктор учетной политики";

// Success message
// If set to "", script will return empty response
$successMessage = "<div class=\"modal-header\">
            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>
            <header class=\"modal-success_header\" id=\"successModalLabel\">Спасибо! Ваша заявка принята.</header>
        </div>
        <div class=\"modal-body\">
            <p class=\"modal-success_text\">Мы свяжемся с вами в ближайшее время.</p>
        </div>";

// Fail message
// If set to "", script will return json error response
$failMessage = "<div class=\"modal-header\">
            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>
            <header class=\"modal-success_header\" id=\"successModalLabel\">Ошибка!</header>
        </div>
        <div class=\"modal-body\">
            <p class=\"modal-success_text\">Перезагрузите, пожалуйста, страницу.</p>
        </div>";


$normFailMessage = "<header class='modal-success_header'>Ошибка!</header><p class='modal-success_text'>Перезагрузите, пожалуйста, страницу.</p>";

?>