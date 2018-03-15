<?php
require('database-controller.php');

function loadJobs()
{
    $db = getDb();

    $query = 'SELECT * FROM JOB';
    $stmt = $db->prepare($query);
    $stmt->execute();

    return $stmt;
}

function loadPlayerJobs($id)
{
    $db = getDb();

    $query = 'SELECT * FROM PLAYER_JOB WHERE ID_PLAYER = :id';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id',$id);
    $stmt->execute();

    return $stmt;
}