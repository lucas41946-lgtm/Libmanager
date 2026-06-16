// Recebe um schema do Zod e valida o corpo da requisição (req.body).
function validate(schema) {
  return (req, res, next) => {
    const resultado = schema.safeParse(req.body);
    if (!resultado.success) {
      const erros = resultado.error.issues.map((i) => ({
        campo: i.path.join('.'),
        mensagem: i.message,
      }));
      return res.status(400).json({ erro: 'Dados inválidos.', detalhes: erros });
    }
    req.body = resultado.data;
    next();
  };
}

module.exports = validate;