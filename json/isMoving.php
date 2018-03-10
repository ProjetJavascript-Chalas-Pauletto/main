<?php

session_start();

require '../model/database-controller.php';

$resultat = new stdClass();
$resultat->result = true; // How is it going ?
$resultat->message = " "; // Error displaying
$resultat->pos = array();

$pdo = getDb();

$sqlMove = "SELECT POS_X, POS_Y, TIME_START, TIME_LENGTH FROM PATH WHERE ID_PLAYER = :id";

$stmtMove = $pdo->prepare($sqlMove);
$stmtMove->bindValue('id', $_SESSION['id'], PDO::PARAM_INT);

try
{
    $stmtMove->execute();

    if($stmtMove->rowCount() == 1){
        $stmtMove->setFetchMode(PDO::FETCH_ASSOC);
        $tmp = $stmtMove->fetch();
        $resultat->pos['POS_X_DEST'] = $tmp['POS_X']; $resultat->pos['POS_Y_DEST'] = $tmp['POS_Y'];
        $timeStart = $tmp['TIME_START'];
        $timeLength = $tmp['TIME_LENGTH'] . '0';

        if (date('Y-m-d H:i:s',strtotime($timeStart) + $timeLength) < date("Y-m-d H:i:s")){

            $sqlDelete = "DELETE FROM PATH WHERE ID_PLAYER = :id";
            $stmtDelete = $pdo->prepare($sqlDelete);
            $stmtDelete->bindValue('id', $_SESSION['id'], PDO::PARAM_INT);

            $stmtDelete->execute();

            $sqlUpdate = "UPDATE POSITION SET POS_X = :pos_x, POS_Y =:pos_y WHERE ID_PLAYER = :id";
            $stmtUpdate = $pdo->prepare($sqlUpdate);
            $stmtUpdate->bindValue('id', $_SESSION['id'], PDO::PARAM_INT);

            $stmtUpdate->bindValue('pos_x', $tmp['POS_X'], PDO::PARAM_INT);
            $stmtUpdate->bindValue('pos_y', $tmp['POS_Y'], PDO::PARAM_INT);

            $stmtUpdate->execute();
            $resultat->result = false;
            $resultat->message = "Moving done";
        } else {
            $resultat->result = true;
            $resultat->message = "Still moving";
            $resultat->time = strtotime($timeStart) + $timeLength - strtotime(date("Y-m-d H:i:s"));
        }
    } else {
        $resultat->result = false;
        $resultat->message ="Moving done";
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