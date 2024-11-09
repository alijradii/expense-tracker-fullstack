<?php

include __DIR__ . '/../database/connection.php';

$query = $connection->prepare("select * from users");

$query->execute();

$result = $query->get_result();

$user = $result->fetch_assoc();
echo json_encode($user);
