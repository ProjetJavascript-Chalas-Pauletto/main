<?php

session_start();

require '../model/database-controller.php';

$resultat = new stdClass();
$resultat->result = true; // How is it going ?
$resultat->message = " "; // Error displaying
$resultat->qty = $_POST['quantity'];


if($_POST['ressourceId'] != " ") {

    $pdo = getDb();

    $sqlSave = "UPDATE INVENTORY SET QUANTITY = QUANTITY + :quantity WHERE ID_USER = :id AND ID_RESSOURCE = :ressourceId";

    $stmtSave = $pdo->prepare($sqlSave);
    $stmtSave->bindValue('quantity', $_POST['quantity'], PDO::PARAM_INT);
    $stmtSave->bindValue('id', $_SESSION['id'], PDO::PARAM_INT);
    $stmtSave->bindValue('ressourceId', $_POST['ressourceId'], PDO::PARAM_INT);

    try {
        $stmtSave->execute();
    } catch (PDOException $e) {
        $resultat->result = false;
        $resultat->message = "Database connexion error";
        exit();
    }
} else {
    $resultat->result = false;
    $resultat->message = "Something went wrong in saving";
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');


echo json_encode($resultat);