<?php
require('database-controller.php');

function getUserData($email)
{
    $db = getDb();

    $query = 'SELECT ID,USERNAME,EMAIL,PASSWORD, AVATAR FROM USER WHERE EMAIL = :email';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email',$email);
    $stmt->execute();

    return $stmt;
}

function getActiveAcount($username){
    $db = getDb();

    $query = 'SELECT ACTIVE FROM USER WHERE USERNAME = :username';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':username',$username);
    $stmt->execute();

    return $stmt;
}
