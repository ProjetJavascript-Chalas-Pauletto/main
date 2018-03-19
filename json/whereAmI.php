<?php

session_start();

require '../model/database-controller.php';

$resultat = new stdClass();
$resultat->result = true; // How is it going ?
$resultat->message = " "; // Error displaying
$resultat->pos = array();

$pdo = getDb();

$sqlPos = "SELECT POS_X, POS_Y FROM POSITION WHERE ID_PLAYER = :id";

$stmtPos = $pdo->prepare($sqlPos);
$stmtPos->bindValue('id', $_SESSION['id'], PDO::PARAM_INT);

try
{
    $stmtPos->execute();
    $stmtPos->setFetchMode(PDO::FETCH_ASSOC);
    $tmp = $stmtPos->fetch();
    $resultat->pos['POS_X']= $tmp['POS_X'];
    $resultat->pos['POS_Y']= $tmp['POS_Y'];

    $sqlLand = "SELECT ATTRIBUTS FROM MAP WHERE POS_X = :pos_x AND POS_Y = :pos_y";
    $stmtLand = $pdo->prepare($sqlLand);
    $stmtLand->bindValue('pos_x', $tmp['POS_X'] , PDO::PARAM_INT);
    $stmtLand->bindValue('pos_y', $tmp['POS_Y'] , PDO::PARAM_INT);

    $stmtLand->execute();
    $stmtLand->setFetchMode(PDO::FETCH_ASSOC);
    $tmpLand = $stmtLand->fetch();
    $resultat->landType = $tmpLand['ATTRIBUTS'];
    switch ($resultat->landType){
        case "FOREST":
            $resultat->ressourceId = 1;
            break;
        case "LAKE":
            $resultat->ressourceId = 3;
            break;
        case "MINE":
            $resultat->ressourceId = 2;
            break;
    }
}
catch (PDOException $e)
{
    $resultat->result = false;
    $resultat->message = "Database connexion error";
    exit();
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');


echo json_encode($resultat);