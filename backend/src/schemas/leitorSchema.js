const { z } = require('zod');

const leitorSchema = z.object({
  nome_completo: z.string().min(3, 'Informe o nome completo.'),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve estar no formato 000.000.000-00.'),
  email: z.string().email('E-mail inválido.'),
  telefone: z.string().optional().or(z.literal('')),
});

module.exports = { leitorSchema };