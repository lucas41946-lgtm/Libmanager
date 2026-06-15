require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

// rota de teste: confirma que a API está no ar
app.get('/', (req, res) => {
  res.json({ status: 'ok', api: 'LibManager' });
});

// testa a conexão com o banco ao iniciar
pool.getConnection()
  .then((conn) => {
    console.log('Conectado ao MySQL com sucesso.');
    conn.release();
  })
  .catch((err) => console.error('Erro ao conectar no MySQL:', err.message));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));