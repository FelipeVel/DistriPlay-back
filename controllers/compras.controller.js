const utilities = require("../config/utilities");

const controller = {};

controller.getCompra = async (req, res) => {
    const { id } = req.params;
    const compra = await utilities.executeQuery('SELECT * FROM Compra WHERE id = $1', [id]);
    if (compra.error) {
        res.json({ status: 'Error al obtener compra' });
        return;
    }
    const items = await utilities.executeQuery('SELECT * FROM Compra_Videojuego WHERE compra = $1', [id]);
    if (items.error) {
        res.json({ status: 'Error al obtener items' });
        return;
    }
    const fullItems = [];
    for (const item of items.rows) {
        const fullItem = await utilities.executeQuery('SELECT id,nombre FROM Videojuego WHERE id = $1', [item.juego]);
        if (fullItem.error) {
            res.json({ status: 'Error al obtener info de item '+item.juego });
            return;
        }
        fullItems.push(fullItem.rows[0]);
    }
    res.json({...compra.rows[0], juegos: fullItems});
}

controller.getComprasByCliente = async (req, res) => {
    const { idCliente } = req.params;
    const compras = await utilities.executeQuery('SELECT * FROM Compra WHERE usuario = $1', [idCliente]);
    if (compras.error) {
        res.json({ status: 'Error al obtener compras' });
    } else
    res.json(compras.rows);
}

controller.createCompra = async (req, res) => {
    const { usuario, listaVideojuegos, estatus } = req.body;
    const fecha = new Date();
    const insCompra = await utilities.executeQuery(`INSERT INTO compra (usuario, fecha, estatus) VALUES ($1, $2, $3)`, [usuario, utilities.formatoFecha(fecha), estatus]);
    if (insCompra.error) {
        res.json({ status: 'Error al crear compra' });
        return;
    }
    const compra = await utilities.executeQuery('SELECT id FROM compra WHERE usuario = $1 AND fecha = $2 ORDER BY id desc LIMIT 1', [usuario, utilities.formatoFecha(fecha)]);
    if (compra.error) {
        res.json({ status: 'Error al obtener compra' });
        return;
    }
    listaVideojuegos.map(async(juego) => {
        const videojuego = await utilities.executeQuery('INSERT INTO compra_videojuego (compra, juego) VALUES ($1, $2)', [compra.rows[0].id, juego]);
        if (videojuego.error) {
            res.json({ status: 'Error al crear relacion videojuegoCompra' });
        }
    })
    res.json({ status: 'Successful', data: {idCompra: compra.rows[0].id} });
}

module.exports = controller;
