<?php

include __DIR__ . '/../database/connection.php';

$email = isset($_POST["email"]) ? $_POST["email"] : null;
$password = isset($_POST['password']) ? $_POST['password'] : null;

if ($password && $email) {
  $checkQuery = $connection->prepare("SELECT * FROM users WHERE email = ?");
  $checkQuery->bind_param("s", $email);
  $checkQuery->execute();
  $checkResult = $checkQuery->get_result();

  if ($checkResult->num_rows > 0) {
    $user = $checkResult->fetch_assoc();
    $userId = $user["id"];
    $hashedPassword = $user["password"];

    $verifyPassword = password_verify($password, $user["password"]);

    if (!$verifyPassword) {
      echo json_encode(["status" => "fail", "message" => "wrong password", "user_id" => $userId]);
    } else {
      echo json_encode(["status" => "success", "message" => "logged in successfully", "user_id" => $userId]);
    }
  } else {
    echo json_encode(["status" => "fail", "message" => "email not found"]);
  }
} else {
  echo json_encode(["status" => "fail", "message" => "invalid input"]);
}

$connection->close();
