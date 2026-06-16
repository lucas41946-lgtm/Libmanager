require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool = require('./config/db');

async function seed() {
  try {
    const email = 'bibliotecario@biblioteca.com';
    const senhaPlana = '123456';
    const senhaHash = await bcrypt.hash(senhaPlana, 10);

    const [existe] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (existe.length === 0) {
      await pool.query(
        'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
        ['Bibliotecario Admin', email, senhaHash]
      );
      console.log(`Usuário criado -> ${email} | senha: ${senhaPlana}`);
    } else {
      console.log('Usuário padrão já existe.');
    }
    process.exit(0);
  } catch (err) {
    console.error('Erro no seed:', err);
    process.exit(1);
  }
}

seed();