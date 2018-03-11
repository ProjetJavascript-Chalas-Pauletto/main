<?php
require('database-controller.php');

function loadResources()
{
    $db = getDb();

    $query = 'SELECT * FROM RESSOURCE';
    $stmt = $db->prepare($query);
    $stmt->execute();

    return $stmt;
}

function loadResourceInventory($id)
{
    $db = getDb();

    $query = 'SELECT * FROM INVENTORY WHERE ID_USER = :id';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id',$id);
    $stmt->execute();

    return $stmt;
}


function saveInventory($username){
    $db = getDb();

    $query = 'SELECT ACTIVE FROM USER WHERE USERNAME = :username';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':username',$username);
    $stmt->execute();

    return $stmt;
}