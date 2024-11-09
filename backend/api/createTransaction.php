<?php

include __DIR__ . '/../database/connection.php';
include __DIR__ . '/../helpers/verifyUser.php';

$transactionAmount = $_POST["amount"];
$transactionType = $_POST["type"];
$transactionDate = $_POST["date"];
$transactionNote = $_POST["note"];

if (!isset($transactionAmount) || !isset($transactionDate) || !isset($transactionType) || !isset($transactionNote)) {
  echo json_encode(["status" => "fail", "message" => "invalid input"]);
  exit;
}

$insert_query = $connection->prepare("INSERT INTO transactions (note, amount, type, date, users_id) values (?, ?, ?, ?, ?)");
$insert_query->bind_param("sissi", $transactionNote, $transactionAmount, $transactionType, $transactionDate, $userId);

$insert_query->execute();

if ($insert_query->affected_rows === 0) {
  echo json_encode(["status" => "fail", "message" => "failed to create transaction"]);
  exit;
}


echo json_encode(["status" => "success", "message" => "successfully created transaction"]);
