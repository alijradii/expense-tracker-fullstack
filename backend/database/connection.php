<?php

$host = "localhost";
$dbuser = "root";
$pass = "";
$dbname = "expense_trackerdb";

$connection = new mysqli($host, $dbuser, $pass, $dbname);

if ($connection->connect_error) {
  die("Error happened");
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST");
