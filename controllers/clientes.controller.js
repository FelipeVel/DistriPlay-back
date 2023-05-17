const utilities = require("../config/utilities");

const controller = {};

controller.getClientes = async (req, res) => {
    const clientes = await utilities.executeQuery('SELECT * FROM cliente');
    if (clientes.error) {
        res.json({ status: 'Error al obtener clientes' });
        return;
    } else if (clientes.rows.length == 0) {
        res.json({ status: 'Cliente no encontrado' });
        return;
    }
    res.json(clientes.rows);
};

controller.getCliente = async (req, res) => {
    const { id } = req.params;
    const clientes = await utilities.executeQuery('SELECT * FROM cliente WHERE cedula = $1', [id]);
    if (clientes.error) {
        res.json({ status: 'Error al obtener cliente' });
        return;
    } else if (clientes.rows.length == 0) {
        res.json({ status: 'Cliente no encontrado' });
        return;
    }
    res.json(clientes.rows[0]);
};

module.exports = controller;