<?php

declare(strict_types=1);

$destinationEmail = "nirbhaoguetaba@gmail.com";
$siteName = "Portfolio GUETABA NIRBHAO";

function respond(int $status, bool $success, string $message): never
{
    http_response_code($status);
    header("Content-Type: application/json; charset=UTF-8");
    header("Cache-Control: no-store");

    echo json_encode(
        [
            "success" => $success,
            "message" => $message,
        ],
        JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE
    );

    exit;
}

function postedString(string $field): string
{
    $value = $_POST[$field] ?? "";

    return is_string($value) ? trim($value) : "";
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Allow: POST");
    respond(405, false, "Méthode de requête invalide.");
}

$name = preg_replace('/[\r\n]+/', " ", postedString("name")) ?? "";
$email = postedString("email");
$subject = preg_replace('/[\r\n]+/', " ", postedString("subject")) ?? "";
$message = postedString("message");

if ($name === "" || $email === "" || $subject === "" || $message === "") {
    respond(400, false, "Veuillez remplir tous les champs.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, false, "Adresse email invalide.");
}

if (
    strlen($name) > 100 ||
    strlen($email) > 254 ||
    strlen($subject) > 150 ||
    strlen($message) > 5000
) {
    respond(400, false, "Un ou plusieurs champs dépassent la longueur autorisée.");
}

$mailSubject = "=?UTF-8?B?" .
    base64_encode("Portfolio - " . $subject) .
    "?=";

$mailBody =
    "Nouveau message reçu depuis le portfolio." . PHP_EOL . PHP_EOL .
    "Nom : " . $name . PHP_EOL .
    "Email : " . $email . PHP_EOL .
    "Sujet : " . $subject . PHP_EOL . PHP_EOL .
    "Message :" . PHP_EOL .
    $message;

$headers = [
    "From: " . $siteName . " <" . $destinationEmail . ">",
    "Reply-To: " . $email,
    "Content-Type: text/plain; charset=UTF-8",
];

if (!mail($destinationEmail, $mailSubject, $mailBody, implode("\r\n", $headers))) {
    error_log("Contact form email could not be sent by the configured mail transport.");
    respond(
        503,
        false,
        "Le serveur n'a pas pu envoyer votre message. Veuillez réessayer plus tard."
    );
}

respond(
    200,
    true,
    "Votre message a été envoyé. Merci pour votre prise de contact !"
);
