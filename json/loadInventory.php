<?php

session_start();

require '../model/inventory.php';

$result = new stdClass();
$result->message = ""; // Error displaying
$result->resources = array();


$resources = loadResourceInventory($_SESSION["id"]);

while ($row = $resources->fetch()) {
    $result->resources[$row['ID_RESSOURCE']] = (int)$row['QUANTITY'];
    //array_push($result->resources, array($row['ID_RESSOURCE'], (int)$row['QUANTITY']));
}


header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($result);