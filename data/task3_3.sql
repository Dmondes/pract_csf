-- TODO Task 3
CREATE DATABASE IF NOT EXISTS orders;

-- Use the 'orders' database
USE orders;

-- Create the 'orders' table
CREATE TABLE IF NOT EXISTS orders (
    order_id VARCHAR(26) NOT NULL PRIMARY KEY,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    priority BOOLEAN DEFAULT FALSE,
    comments TEXT
);

-- Create the 'line_items' table
CREATE TABLE IF NOT EXISTS line_items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(26) NOT NULL,
    prod_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);