<?php

include __DIR__ . '/../database/connection.php';
include __DIR__ . '/../helpers/verifyUser.php';

$transactionsQuery = $connection->prepare("SELECT * FROM transactions WHERE users_id = ?");
$transactionsQuery->bind_param("i", $userId);
$transactionsQuery->execute();

$result = $transactionsQuery->get_result();

$transactions = [];
$rows = $result->num_rows;
while ($rows--) {
  $transactions[] = $result->fetch_assoc();
}

echo json_encode(["status" => "success", "message" => "found the user", "transaction" => $transactions]);
