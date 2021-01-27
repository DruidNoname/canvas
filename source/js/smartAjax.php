<?php
// Smart Ajax
// Author: Dj_Haski
// Version: 1.5
include "saConfig.php";

function startsWith($haystack, $needle)
{
     $length = strlen($needle);
     return (substr($haystack, 0, $length) === $needle);
}

function sendMail($replacable)
{
    global $HTML, $to, $subject;
    $html = $HTML;
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/html; charset=UTF-8';
    foreach ($replacable as $key => $value) {
        $html = str_replace("%".$key."%", $value, $html);
    }
    file_put_contents("/tmp/log.data", "data"."\n");
    mail($to, $subject, $html, implode("\r\n", $headers));
}

function isTypeValid($value, $type)
{
    if($type == "telephone") {
        return preg_match("/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.\/0-9]*$/", $value);
    }
    elseif($type == "number") {
        return is_int($value);
    }
    elseif($type == "email") {
        return preg_match("/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/", $value);
    }
    elseif($type == "float") {
        return is_float($value);
    }
    elseif($type == "notempty") {
        return strlen($value) != 0;
    }
    elseif($type == "all") {
        return true;
    }
    else {
        return false;
    }

}

function controlView()
{
    global $VALUES, $failMessage, $successMessage;
    $replacable = array();
    foreach( $VALUES as $key => $val) {
        if (startsWith($key, "_")) {
            if(array_key_exists(trim($key, "_"), $_POST)) {
                if(isTypeValid($_POST[trim($key, "_")], $val)) {
                    $replacable[trim($key, "_")] = $_POST[trim($key, "_")];
                }
                else {
                    if($failMessage == "") {
                        $d = array(
                            "status" => false,
                            "field" => trim($key, "_")
                        );
                        echo json_encode($d);
                        return;
                    }
                    else {
                        echo $failMessage;
                        return;
                    }
                }
            }
            else {
                $replacable[trim($key, "_")] = "";
            }
        }
        else {
            if(!array_key_exists($key, $_POST)) {
                if($failMessage == "") {
                        $d = array(
                            "status" => false,
                            "field" => $key
                        );
                        echo json_encode($d);
                        return;
                    }
                    else {
                        echo $failMessage;
                        return;
                    }
            }
            else {
                if(isTypeValid($_POST[$key], $val)) {
                    $replacable[$key] = $_POST[$key];
                }
                else {
                    if($failMessage == "") {
                        $d = array(
                            "status" => false,
                            "field" => $key
                        );
                        echo json_encode($d);
                        return;
                    }
                    else {
                        echo $failMessage;
                        return;
                    }
                }
            }
        }
    }
    sendMail($replacable);
    echo $successMessage;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    controlView();
}
?>