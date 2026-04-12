<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $first   = htmlspecialchars(strip_tags(trim($_POST["first_name"] ?? "")));
    $last    = htmlspecialchars(strip_tags(trim($_POST["last_name"]  ?? "")));
    $email   = filter_var(trim($_POST["email"]   ?? ""), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(strip_tags(trim($_POST["message"]    ?? "")));

    // Only allow safe relative redirect paths
    $raw      = $_POST["_redirect"] ?? "/";
    $redirect = preg_match('/^\/[a-zA-Z0-9\/_-]*$/', $raw) ? $raw : "/";

    if (!$first || !$last || !filter_var($email, FILTER_VALIDATE_EMAIL) || !$message) {
        header("Location: " . $redirect . "?status=error");
        exit;
    }

    $to      = "anthony@anthonydelphy.com";
    $subject = "Portfolio Contact from $first $last";
    $body    = "From: $first $last <$email>\n\n$message";
    $headers = "From: noreply@anthonydelphy.com\r\nReply-To: $email";

    mail($to, $subject, $body, $headers);
    header("Location: " . $redirect . "?status=sent");
    exit;
}
