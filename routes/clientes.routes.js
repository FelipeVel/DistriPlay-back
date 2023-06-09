const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientes.controller');

router.get('/', clientesController.getClientes);
router.get('/:id', clientesController.getCliente);
router.post('/', clientesController.createCliente);
router.post('/login/', clientesController.loginCliente);

module.exports = router;