<?php

session_start();

require '../model/database-controller.php';

$resultat = new stdClass();
$resultat->result = true; // How is it going ?
$resultat->message = " "; // Error displaying

$pdo = getDb();
$sql1 = "SELECT * FROM MAP";
$stmt = $pdo->prepare($sql1);
try
{
    $mapM = array();
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_ASSOC);
    for ($i = 0;$i<$stmt->rowCount();++$i){
        $tmp = $stmt->fetch();
        $mapM[$tmp['POS_X']][$tmp['POS_Y']] = $tmp['ATTRIBUTS'];
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

echo json_encode($mapM);