<?php

session_start();

require '../model/jobs.php';

$result = new stdClass();
$result->message = "";
$result->jobs = array();
$result->playerJobs = array();

$jobs = loadJobs();
$playerJobs = loadPlayerJobs($_SESSION['id']);

//Jobs
while ($row = $jobs->fetch()) {
    $result->jobs[$row["ID"]] = array($row['NAME']);
}

//PlayerJobs
while ($row = $playerJobs->fetch()) {
    $result->playerJobs[$row["ID_JOB"]] = (int)$row['EXP'];
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($result);