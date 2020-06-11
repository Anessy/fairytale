<?php 

$name = $_POST['user_name']; 
$my_mail = $_POST['user_mail']; 
$message = $_POST['user_message'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.i.ua';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'r.natalochka@i.ua';                 // Наш логин
$mail->Password = 'ujcgjlm-gfcnshmvjq';                // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('r.natalochka@i.ua', 'Nataliya Kaplunenko');   // От кого письмо 
$mail->addAddress('r.natalochka@i.ua');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Письмо с сайта faityTails';
$mail->Body    = '
	<br> 
	Имя: ' . $name . '<br> <br>
	Почта: ' . $my_mail . '<br> <br>
	Сообщение: <br> ' . $message ; 


$mail->AltBody = 'Это альтернативный текст';

if(!$mail->send()) {
    return false;
} else {
    header ('Location: ../index.html');
}

?>


