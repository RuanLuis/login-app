const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./public/db');

const app = express(); // ← deve vir antes de tudo

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/register', (req, res) => {
  const { email, password } = req.body;
  const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
  
  db.query(query, [email, password], (err, result) => {
    if (err) {
      console.error('Erro no cadastro:', err);
      return res.send('Erro no cadastro: ' + err.message);
    }
    // Redireciona para a página inicial (login)
    res.redirect('/index.html'); // ou use '/' se quiser
  });
});


// Rota de login com e-mail
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Erro no login:', err);
      return res.send('Erro no login: ' + err.message);
    }
    if (results.length > 0) {
      res.send('Login bem-sucedido!');
    } else {
      res.send('E-mail ou senha incorretos!');
    }
  });
});

app.listen(3000, () => {
  console.log('🚀 Servidor rodando em http://localhost:3000');
});
