const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, categoriaController.listar);

module.exports = router;