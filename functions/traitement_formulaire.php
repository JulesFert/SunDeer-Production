<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom_prenom = $_POST["nom_prenom"];
    $email = $_POST["email"];
    $telephone = $_POST["telephone"];
    $message = $_POST["message"];

    // Mettez en forme le courriel
    $sujet = "Nouveau message de $nom_prenom";
    $corps_message = "Nom et Prénom: $nom_prenom\n";
    $corps_message .= "Email: $email\n";
    $corps_message .= "Téléphone: $telephone\n\n";
    $corps_message .= "Message:\n$message";

    // Adresse email de réception
    $destinataire = "jfert.lyon@gmail.com"; // Remplacez par votre adresse Gmail

    // Utilisation de PHPMailer pour envoyer le courriel
    $mail = new PHPMailer(true);

    try {
        $mail->SMTPDebug = SMTP::DEBUG_OFF;
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'jfert.lyon@gmail.com'; // Remplacez par votre adresse Gmail
        $mail->Password = 'nuyt gyge ltxk rmyl'; // Remplacez par votre mot de passe Gmail
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->SMTPDebug = SMTP::DEBUG_SERVER;
        $mail->Debugoutput = function($str, $level) {
        echo "SMTP: $str";
        };

        $mail->setFrom($email, $nom_prenom);
        $mail->addAddress($destinataire);

        $mail->isHTML(false);
        $mail->Subject = $sujet;
        $mail->Body = $corps_message;

        $mail->send();

        // Redirection après l'envoi du courriel
        header("Location: ../views/index.html#contact");
        exit();
    } catch (Exception $e) {
        echo "Erreur d'envoi de courriel : {$mail->ErrorInfo}";
    }
}
?>