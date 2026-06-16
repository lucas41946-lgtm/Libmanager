const { z } = require('zod');

const livroSchema = z.object({
  titulo: z.string().min(1, 'O título é obrigatório.'),
  autor: z.string().min(1, 'O autor é obrigatório.'),
  ano_publicacao: z.coerce.number().int().max(new Date().getFullYear(), 'Ano inválido.'),
  categoria_id: z.coerce.number().int().positive('Selecione uma categoria.'),
});

module.exports = { livroSchema };