<?php
session_start();

$stmt = new stdClass();
$stmt->result = true; // How is it going ?
$stmt->message = ""; // Error displaying

if (isset($_SESSION['id'])) {
    $stmt->result = true;
    $stmt->message = 'User connected';
} else {
    $stmt->result = false;
    $stmt->message = 'User not connected';
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($stmt);