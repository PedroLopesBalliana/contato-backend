require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/contato', async (req, res) => {
  const { nome, email, mensagem } = req.body;

  // Log para confirmar que o frontend chegou no backend
  console.log("Dados recebidos:", nome, email, mensagem);

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // vem do .env
      pass: process.env.EMAIL_PASS  // vem do .env
    }
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // ou outro destinatário
    subject: 'Nova mensagem de contato',
    text: `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    // Log extra para confirmar que o Gmail aceitou
    console.log("E-mail enviado:", info.response);

    res.send('Mensagem enviada com sucesso!');
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    res.status(500).send('Erro ao enviar mensagem.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
