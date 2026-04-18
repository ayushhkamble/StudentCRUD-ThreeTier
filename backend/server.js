const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(bodyParser.json());

// ─── MySQL Connection ──────────────────────────────────────────────────────────
const db = mysql.createConnection({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'cruduser',
  password: process.env.DB_PASSWORD || 'crudpass',
  database: process.env.DB_NAME     || 'studentdb',
  port:     process.env.DB_PORT     || 3306,
});

db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to MySQL database');
});

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// ─── CREATE Student ───────────────────────────────────────────────────────────
app.post('/api/students', (req, res) => {
  const { name, email, course, age } = req.body;
  if (!name || !email || !course || !age) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const sql = 'INSERT INTO students (name, email, course, age) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, course, age], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Student added', id: result.insertId });
  });
});

// ─── READ All Students ────────────────────────────────────────────────────────
app.get('/api/students', (req, res) => {
  db.query('SELECT * FROM students ORDER BY created_at DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ─── READ Single Student ──────────────────────────────────────────────────────
app.get('/api/students/:id', (req, res) => {
  db.query('SELECT * FROM students WHERE id = ?', [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  });
});

// ─── UPDATE Student ───────────────────────────────────────────────────────────
app.put('/api/students/:id', (req, res) => {
  const { name, email, course, age } = req.body;
  const sql = 'UPDATE students SET name=?, email=?, course=?, age=? WHERE id=?';
  db.query(sql, [name, email, course, age, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Student updated' });
  });
});

// ─── DELETE Student ───────────────────────────────────────────────────────────
app.delete('/api/students/:id', (req, res) => {
  db.query('DELETE FROM students WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Student deleted' });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
