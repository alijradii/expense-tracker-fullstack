<?php

include __DIR__ . '/../database/connection.php';
include __DIR__ . '/../helpers/verifyUser.php';

$transactionsQuery = $connection->prepare("
  SELECT 
  COALESCE(SUM(CASE WHEN type = 'INC' THEN amount ELSE 0 END), 0) - 
  COALESCE(SUM(CASE WHEN type = 'EXP' THEN amount ELSE 0 END), 0) AS total_budget
FROM transactions
    WHERE user_id = ?
");

$transactionsQuery->execute();
$result = $transactionsQuery->get_result();
$amount = $result->fetch_assoc();

echo json_encode(["status" => "success", "amount" =>  $amount]);
