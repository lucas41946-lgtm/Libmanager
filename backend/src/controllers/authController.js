const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuarioModel');

async function register(req, res) {
  try {
    const { nome, email, senha } = req.body;
    const existente = await usuarioModel.buscarPorEmail(email);
    if (existente) {
      return res.status(409).json({ erro: 'Já existe um usuário com este e-mail.' });
    }
    const senhaHash = await bcrypt.hash(senha, 10); // criptografa
    const usuario = await usuarioModel.criar({ nome, email, senhaHash });
    return res.status(201).json({ mensagem: 'Usuário criado.', usuario });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao criar usuário.' });
  }
}

async function login(req, res) {
  try {
    const { email, senha } = req.body;
    const usuario = await usuarioModel.buscarPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ erro: 'E-mail ou senha incorretos.' });
    }
    const confere = await bcrypt.compare(senha, usuario.senha); // confere o hash
    if (!confere) {
      return res.status(401).json({ erro: 'E-mail ou senha incorretos.' });
    }
    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );
    return res.json({
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao fazer login.' });
  }
}

module.exports = { register, login };