const express = require('express');
const router = express.Router();
const juegosController = require('../controllers/juegos.controller');

router.get('/', juegosController.getJuegos);
router.get('/:id', juegosController.getJuego);
router.get('/nombre/:nombre', juegosController.getJuegoByNombre);

module.exports = router;