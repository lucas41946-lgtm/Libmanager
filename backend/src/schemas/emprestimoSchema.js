const { z } = require('zod');

const emprestimoSchema = z.object({
  leitor_id: z.coerce.number().int().positive('Selecione o leitor.'),
  livro_id: z.coerce.number().int().positive('Selecione o livro.'),
});

module.exports = { emprestimoSchema };