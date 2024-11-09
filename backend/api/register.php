<?php

include __DIR__ . '/../database/connection.php';

$username = isset($_GET['username']) ? $_GET['username'] : null;
$password = isset($_POST['password']) ? $_POST['password'] : null;
$email = isset($_POST["email"]) ? $_POST["email"] : null;

if ($username && $password && $email) {
  $checkQuery = $connection->prepare("SELECT * FROM users WHERE email = ?");
  $checkQuery->bind_param("s", $email);
  $checkQuery->execute();
  $checkResult = $checkQuery->get_result();

  if ($checkResult->num_rows > 0) {
    echo json_encode(["status" => "fail", "message" => "Email already in use"]);
  } else {
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $insertQuery = $connection->prepare("INSERT INTO users (email, username, password) VALUES (?, ?, ?)");

    $insertQuery->bind_param("sss", $email, $username, $hashedPassword);


    if ($insertQuery->execute()) {
      echo json_encode(["status" => "success", "message" => "User registered successfully"]);
    } else {
      echo json_encode(["status" => "fail", "message" => "Failed to register user"]);
    }
  }

  $checkQuery->close();
  $insertQuery->close();
} else {
  echo json_encode(["status" => "fail", "message" => "Invalid input"]);
  echo json_encode([$username, $email, $password]);
}

$connection->close();
