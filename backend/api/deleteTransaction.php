<?php

include __DIR__ . '/../database/connection.php';
include __DIR__ . '/../helpers/verifyUser.php';

$transactionId = $_GET["transaction_id"];

if (!isset($transactionId)) {
  echo json_encode(["status" => "fail", "message" => "invalid input"]);
  exit;
}

$transactionsQuery = $connection->prepare("SELECT * FROM transactions WHERE users_id = ? and id = ?");
$transactionsQuery->bind_param("ii", $userId, $transactionId);
$transactionsQuery->execute();

$result = $transactionsQuery->get_result();

if ($result->num_rows === 0) {
  echo json_encode(["status" => "fail", "message" => "transaction not found"]);
  exit;
}

echo json_encode(["status" => "success", "message" => "found the user", "transaction" => $transactions]);
