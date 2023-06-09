const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Condfigurando banco de dados

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'wallemdb',
  password: 'Noah1310',
  database: 'barbershop'
});

// Função para salvar os dados no banco de dados
function saveFormData(nome, telefone, data, horario, corte) {
  const query = 'INSERT INTO clientes (nome, telefone, data, horario, corte) VALUES (?, ?, ?, ?, ?)';
  const values = [nome, telefone, data, horario, corte];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Erro ao salvar os dados:', error);
    } else {
      console.log('Dados salvos com sucesso!');
    }
  });
}


// Configurar o middleware express.static para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// criando uma rota para acessar o arquivo agendamento.html com o método GET
app.get('/agendamento', (req, res) => {
  res.sendFile(path.join(__dirname, 'agendamento', 'agendamento.html'));
});

// criando uma rota para acessar o arquivo contato com o método GET.
app.get('/contato', (req, res) => {
  res.sendFile(path.join(__dirname, 'contato', 'contato.html'));
});

app.get('/enviar-email', (req, res) => {
  res.send('Endpoint para enviar e-mails');
});

app.post('/enviar-email', (req, res) => {
  const { name, email, message } = req.body;

  // Configurar o transporte do e-mail
  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: 'wallemtmsn@hotmail.com',
      pass: '@#Kivy1310'
    }
  });

  // Configurar o conteúdo do e-mail
  const mailOptions = {
    from: 'wallemtmsn@hotmail.com',
    to: 'wallemtmsn@hotmail.com',
    subject: 'Nova sugestão de contato',
    text: `Nome: ${name}\nE-mail: ${email}\nMensagem: ${message}`
  };

  // Enviar o e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Erro ao enviar o e-mail');
    } else {
      console.log('E-mail enviado:', info.response);
      res.send('E-mail enviado com sucesso!');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});