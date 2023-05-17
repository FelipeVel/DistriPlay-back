const utilities = require("../config/utilities");

const controller = {};

controller.getCompra = async (req, res) => {
    const { id } = req.params;
    const compra = await utilities.executeQuery('SELECT * FROM Compra WHERE idCompra = ?', [id]);
    if (compra.stack) {
        res.json({ status: 'Error al obtener compra' });
    }
    res.json(compra);
}

controller.getComprasByCliente = async (req, res) => {
    const { id } = req.params;
    const compras = await utilities.executeQuery('SELECT * FROM Compra WHERE idCliente = ?', [id]);
    if (compras.stack) {
        res.json({ status: 'Error al obtener compras' });
    }
    res.json(compras);
}

controller.createCompra = async (req, res) => {
    const { idCliente, listaVideojuegosCantidad, fecha, estatus } = req.body;
    const compra = await utilities.executeQuery('INSERT INTO Compra (idCliente, fecha, estatus) VALUES (?, ?, ?)', [idCliente, fecha, estatus]);
    if (compra.stack) {
        res.json({ status: 'Error al crear compra' });
    }
    for (const juego in listaVideojuegosCantidad) {
        const videojuego = await utilities.executeQuery('INSERT INTO VideojuegoCompra (idVideojuego, idCompra, cantidad) VALUES (?, ?, ?)', [juego, compra.insertId, listaVideojuegosCantidad[key]]);
        if (videojuego.stack) {
            res.json({ status: 'Error al crear videojuegoCompra' });
        }
    }
    res.json({ status: 'Successful', data: compra });
}

module.exports = controller;
