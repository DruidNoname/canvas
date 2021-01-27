<?php
	// if ($_POST["tel"]) {
		$separator = md5(time());
		$eol = PHP_EOL;

		//mail
		$to = "stepanova@elcode.ru";
        //$to = "rollandgor@gmail.com";

		$subject = "Заявка с лендинга Обучение Госзакупкам";

        $header .= "Content-type: text/plain; charset=\"utf-8\"";
        $header .= "From: Zakup".$eol;
        $header .= "MIME-Version: 1.0".$eol;

        $message = '';

		if ($_POST['name']) { $message .= "Имя: " . $_POST['name'] . "\r\n"; }
		if ($_POST['tel']) { $message .= "Телефон: " . $_POST['tel'] . "\r\n"; }
		if ($_POST['mail']) { $message .= "Почта: " . $_POST['mail'] . "\r\n"; }
		if ($_POST['message']) { $message .= "Вопрос: " . $_POST['message'] . "\r\n"; }
		if ($_POST['formName']) { $message .= "Форма: " . $_POST['formName'] . "\r\n"; }

        if(!empty($_FILES['file']['tmp_name'])) {
            $attachment = chunk_split(base64_encode(file_get_contents($_FILES['file']['tmp_name'])));
            $filename = $_FILES['file']['name'];
            $filetype = $_FILES['file']['type'];
            $un = strtoupper(uniqid(time()));
            $body = "------------".$un."\r\nContent-Type: text/html; charset='utf-8'\r\nContent-Transfer-Encoding: 8bit\r\n\r\n".nl2br($message)."\r\n------------".$un."\r\nContent-Type: application/octet-stream;name=\"$filename\"\r\nContent-Transfer-Encoding:base64\r\nContent-Disposition:attachment;filename=".$filename."\r\n\r\n".$attachment."\r\n";
            $headers = "From: New_PressV\r\nReply-To: New_PressV\r\nMIME-Version: 1.0\r\nContent-Type: multipart/mixed; boundary=\"----------".$un."\"\r\n";
            $send = mail($to, $subject, $body, $headers);

        }else {
            $send = mail($to, $subject, $message, $header);
        }
		// $send1 = mail($to1, $subject, $message, $header);
		// $send2 = mail($to2, $subject, $message, $header);

		if ($send) {
		// if ($send1 and $send2) {
			echo "<header class='modal-success_header'>Спасибо! Ваша заявка принята.</header><p class='modal-success_text'>Мы свяжемся с вами в ближайшее время.</p>";
		} else {
			echo "<header class='modal-success_header'>Ошибка!</header><p class='modal-success_text'>Перезагрузите страницу.</p>";
		}

	// }
?>