const express = require('express');
const router = express.Router();
const emprestimoController = require('../controllers/emprestimoController');
const auth = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { emprestimoSchema } = require('../schemas/emprestimoSchema');

router.get('/', auth, emprestimoController.listar);
router.post('/', auth, validate(emprestimoSchema), emprestimoController.criar);
router.patch('/:id/devolver', auth, emprestimoController.devolver);

module.exports = router;