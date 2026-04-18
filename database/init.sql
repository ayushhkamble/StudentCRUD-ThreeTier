-- ─────────────────────────────────────────────────────────────
--  StudentCRUD – Database Initialization Script
--  Run this once to set up the database schema and seed data
-- ─────────────────────────────────────────────────────────────

CREATE DATABASE IF NOT EXISTS studentdb;
USE studentdb;

-- Create dedicated app user (safer than using root)
CREATE USER IF NOT EXISTS 'cruduser'@'%' IDENTIFIED BY 'crudpass';
GRANT ALL PRIVILEGES ON studentdb.* TO 'cruduser'@'%';
FLUSH PRIVILEGES;

-- ─── Students Table ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS students (
  id         INT          AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL UNIQUE,
  course     VARCHAR(100) NOT NULL,
  age        INT          NOT NULL CHECK (age BETWEEN 15 AND 80),
  created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── Seed Data ───────────────────────────────────────────────
INSERT INTO students (name, email, course, age) VALUES
  ('Ayush Sharma',   'ayush@example.com',   'Computer Science',    21),
  ('Priya Patil',    'priya@example.com',    'Information Technology', 20),
  ('Rahul Desai',    'rahul@example.com',    'Electronics',         22),
  ('Sneha Joshi',    'sneha@example.com',    'Mechanical Engineering', 21),
  ('Aditya Kulkarni','aditya@example.com',   'Civil Engineering',   23);

SELECT 'Database initialized successfully!' AS status;
