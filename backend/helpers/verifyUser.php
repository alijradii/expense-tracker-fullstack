<?php

include __DIR__ . '/../database/connection.php';

$userId = $_GET["id"];
$password = $_POST["password"];


if (!isset($userId) || !isset($password)) {
  echo json_encode(["status" => "fail", "message" => "invalid input"]);
  exit;
}

$checkUserQuery = $connection->prepare("SELECT * FROM users WHERE id = ?");
$checkUserQuery->bind_param("i", $userId);

$checkUserQuery->execute();
$checkUserResult = $checkUserQuery->get_result();

if ($checkUserResult->num_rows === 0) {
  echo json_encode(["status" => "fail", "message" => "user not found"]);
  exit;
}

$user = $checkUserResult->fetch_assoc();
$verifyPassword = password_verify($password, $user["password"]);

if (!$verifyPassword) {
  echo json_encode(["status" => "fail", "message" => "invalid password"]);
  exit;
}
