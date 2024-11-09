<?php

include __DIR__ . '/../database/connection.php';
include __DIR__ . '/../helpers/verifyUser.php';

$transactionId = $_GET["transaction_id"];

if (!isset($transactionId)) {
  echo json_encode(["status" => "fail", "message" => "invalid input"]);
  exit;
}

$transactionsQuery = $connection->prepare("DELETE FROM transactions WHERE users_id = ? and id = ?");
$transactionsQuery->bind_param("ii", $userId, $transactionId);
$transactionsQuery->execute();

if ($transactionsQuery->affected_rows === 0) {
  echo json_encode(["status" => "fail", "message" => "transaction not found"]);
  exit;
}

echo json_encode(["status" => "success", "message" => "successfully delete the transaction"]);
