<?php
include "link.php";

$username = $_POST['username'];
$password = $_POST['password'];
$confirm_password = $_POST['confirm_password']; // 1. Grab the second password

// 2. Check if all fields (including confirm) are filled
if (empty($username) || empty($password) || empty($confirm_password)) {
    exit("All fields required");
}

// 3. Compare the passwords
if ($password !== $confirm_password) {
    exit("Passwords do not match!");
}

// Check if user already exists
$stmt = $conn->prepare("SELECT * FROM account WHERE login = ?");
$stmt->execute([$username]);

if ($stmt->rowCount() > 0) {
    exit("User already exists");
}

// Hash password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Insert into DB
$stmt = $conn->prepare("INSERT INTO account (login, password) VALUES (?, ?)");
$stmt->execute([$username, $hashedPassword]);

echo "Account created successfully!";
?>