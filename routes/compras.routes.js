const express = require('express');
const router = express.Router();
const comprasController = require('../controllers/compras.controller');

router.get('/:id', comprasController.getCompra);
router.get('/cliente/:idCliente', comprasController.getComprasByCliente);
router.post('/', comprasController.createCompra);

module.exports = router;