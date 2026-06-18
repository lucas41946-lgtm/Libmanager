const express = require('express');
const router = express.Router();
const leitorController = require('../controllers/leitorController');
const auth = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { leitorSchema } = require('../schemas/leitorSchema');

router.get('/', auth, leitorController.listar);
router.post('/', auth, validate(leitorSchema), leitorController.criar);

module.exports = router;