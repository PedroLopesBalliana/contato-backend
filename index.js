require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// 🔓 libera CORS para qualquer origem (teste)
app.use(cors());
app.use(bodyParser.json());

// rota principal de contato
app.post('/contato', async (req, res) => {
  const { nome, email, mensagem } = req.body;
  console.log("Dados recebidos:", nome, email, mensagem);

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'Nova mensagem de contato',
    text: `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("E-mail enviado:", info.response);
    res.send('Mensagem enviada com sucesso!');
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    res.status(500).send('Erro ao enviar mensagem.');
  }
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
