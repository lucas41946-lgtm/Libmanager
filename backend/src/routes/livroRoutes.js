const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');
const auth = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { livroSchema } = require('../schemas/livroSchema');

// a requisição passa por: auth (logado?) -> validate (dados ok?) -> controller
router.get('/', auth, livroController.listar);
router.post('/', auth, validate(livroSchema), livroController.criar);

module.exports = router;