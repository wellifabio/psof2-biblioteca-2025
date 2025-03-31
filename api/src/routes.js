const express = require('express');
const routes = express.Router();

const Aluno = require('./controllers/aluno');
const Livro = require('./controllers/livro');
const Emprestimo = require('./controllers/emprestimo');

routes.get('/', (req, res) => {
  return res.json({ titulo: 'Biblioteca ACME' });
});

module.exports = routes;