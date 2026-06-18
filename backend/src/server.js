require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const livroRoutes = require('./routes/livroRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const leitorRoutes = require('./routes/leitorRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', api: 'LibManager' });
});

app.use('/api/auth', authRoutes);
app.use('/api/livros', livroRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/leitores', leitorRoutes);

pool.getConnection()
  .then((conn) => {
    console.log('Conectado ao MySQL com sucesso.');
    conn.release();
  })
  .catch((err) => console.error('Erro ao conectar no MySQL:', err.message));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));