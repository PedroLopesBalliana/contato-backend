require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// 🔓 libera CORS para qualquer origem (teste)
app.use(cors());
app.use(bodyParser.json());

// rota principal de contato
app.post('/contato', async (req, res) => {
  const { nome, email, mensagem } = req.body;
  console.log("Dados recebidos:", nome, email, mensagem);

  // 👉 teste sem enviar email
  res.send('Mensagem recebida no backend!');
});

// rota GET opcional para testar no navegador
app.get('/', (req, res) => {
  res.send('API do contato-backend está rodando!');
});

// 🔧 porta dinâmica para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
