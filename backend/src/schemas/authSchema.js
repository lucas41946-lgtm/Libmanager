const { z } = require('zod');

const registerSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter ao menos 3 caracteres.'),
  email: z.string().email('E-mail inválido.'),
  senha: z.string().min(6, 'A senha deve ter ao menos 6 caracteres.'),
});

const loginSchema = z.object({
  email: z.string().email('E-mail inválido.'),
  senha: z.string().min(1, 'Informe a senha.'),
});

module.exports = { registerSchema, loginSchema };