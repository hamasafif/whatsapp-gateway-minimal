CREATE DATABASE wa_gateway;
USE wa_gateway;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE devices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  device_name VARCHAR(100),
  status VARCHAR(50),
  FOREIGN KEY (user_id) REFERENCES users(id)
);