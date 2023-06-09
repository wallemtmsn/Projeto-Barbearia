const mysql = require('mysql');

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'nome_do_banco_de_dados'
});

// Conecta ao banco de dados
connection.connect((error) => {
  if (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados!');
});

// Função para verificar o login e a senha no banco de dados
function verificarCredenciais(username, password) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM usuarios WHERE username = '${username}' AND password = '${password}'`;
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results.length > 0);
    });
  });
}

// Exemplo de uso
const username = 'usuario_digitado';
const password = 'senha_digitada';

verificarCredenciais(username, password)
  .then((result) => {
    if (result) {
      console.log('Credenciais válidas. Login bem-sucedido!');
    } else {
      console.log('Credenciais inválidas. Login falhou!');
    }
  })
  .catch((error) => {
    console.error('Erro ao verificar credenciais:', error);
  });
