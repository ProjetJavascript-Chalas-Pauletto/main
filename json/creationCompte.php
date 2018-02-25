<?php

require 'connectPDO.php';

session_start();

$resultat = new stdClass();
$resultat->result = true; // How is it going ?
$resultat->message = " "; // Error displaying

if ($_POST['username'] != "" && $_POST['password'] != "" && $_POST['passwordCheck'] != "" && $_POST['mail'] && $_POST['password'] == $_POST['passwordCheck']) {
        $username = $_POST['username'];
        $password = $_POST['password'];
        $mail = $_POST['mail'];

        $password = md5($password);

        $pdo = getConnection();
        $sql = "INSERT INTO USER (USERNAME, PASSWORD, EMAIL) VALUES (:USERNAME, :PASSWORD, :EMAIL)";
        $stmt3 = $pdo->prepare($sql);
        $stmt3->bindValue(':USERNAME', $username);
        $stmt3->bindValue(':PASSWORD', $password);
        $stmt3->bindValue(':EMAIL', $mail);
        try
        {
            $stmt3->execute();
        }
        catch (PDOException $e)
        {
            $resultat->result = false;
            $resultat->message = "Database connexion error";
            exit();
        }

} else {
    $resultat->result = false;
    $resultat->message = "Account creation error";
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($resultat);
