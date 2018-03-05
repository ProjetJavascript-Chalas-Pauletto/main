<?php

require '../model/database-controller.php';

session_start();

$resultat = new stdClass();
$resultat->result = true; // How is it going ?
$resultat->message = " "; // Error displaying

if ($_POST['username'] != "" && $_POST['password'] != "" && $_POST['passwordCheck'] != "" && $_POST['mail'] && $_POST['password'] == $_POST['passwordCheck']) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $mail = $_POST['mail'];

    $pdo = getDb();
    $sql1 = "SELECT * FROM USER WHERE USERNAME = :username";
    $stmtU = $pdo->prepare($sql1);
    $stmtU->bindValue('username', $username,PDO::PARAM_STR);

    try
    {
        $stmtU->execute();
    }
    catch (PDOException $e)
    {
        $resultat->result = false;
        $resultat->message = "Database connexion error";
        exit();
    }

    if($stmtU->rowCount() !=0){
        $resultat->result=false;
        $resultat->message="Username already used";
    }

    $sql2 = 'SELECT * FROM USER WHERE EMAIL = :email';
    $stmtE = $pdo->prepare($sql2);
    $stmtE->bindValue('email', $mail, PDO::PARAM_STR);
    try
    {
        $stmtE->execute();
    }
    catch (PDOException $e)
    {
        $resultat->result = false;
        $resultat->message = "Database connexion error";
        exit();
    }
    if ($stmtE->rowCount() != 0){
        $resultat->result=false;
        $resultat->message="Mail address already used";
    }

    if($resultat->result){

        $password = md5($password);


        $sql3 = "INSERT INTO USER (USERNAME, PASSWORD, EMAIL) VALUES (:username, :password, :email)";
        $stmt3 = $pdo->prepare($sql3);
        $stmt3->bindValue('username', $username,PDO::PARAM_STR);
        $stmt3->bindValue('password', $password,PDO::PARAM_STR);
        $stmt3->bindValue('email', $mail,PDO::PARAM_STR);
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
    }
} else {
    $resultat->result = false;
    $resultat->message = "Password don't match";
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($resultat);