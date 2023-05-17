const utilities = require("../config/utilities");

const controller = {};

controller.getCompra = async (req, res) => {
    const { id } = req.params;
    const compra = await utilities.executeQuery('SELECT * FROM Compra WHERE id = $1', [id]);
    if (compra.error) {
        res.json({ status: 'Error al obtener compra' });
    } else
    res.json(compra.rows[0]);
}

controller.getComprasByCliente = async (req, res) => {
    const { id } = req.params;
    const compras = await utilities.executeQuery('SELECT * FROM Compra WHERE usuario = %1', [id]);
    if (compras.error) {
        res.json({ status: 'Error al obtener compras' });
    } else
    res.json(compras.rows);
}

controller.createCompra = async (req, res) => {
    const { idCliente, listaVideojuegos, estatus } = req.body;
    const fecha = new Date();
    const compra = await utilities.executeQuery('INSERT INTO Compra (usuario, fecha, estatus) VALUES (%1, %2, %3)', [idCliente, utilities.formatoFecha(fecha), estatus]);
    if (compra.error) {
        res.json({ status: 'Error al crear compra' });
        return;
    } else
    for (const juego in listaVideojuegos) {
        const videojuego = await utilities.executeQuery('INSERT INTO compra_juego (compra, juego) VALUES (%1, %2)', [compra.insertId, juego]);
        if (videojuego.error) {
            res.json({ status: 'Error al crear relacion videojuegoCompra' });
            return;
        }
    }
    res.json({ status: 'Successful', data: compra });
}

module.exports = controller;
