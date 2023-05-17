const utilities = require("../config/utilities");

const controller = {};

controller.getClientes = async (req, res) => {
    const clientes = await utilities.executeQuery('SELECT * FROM Cliente');
    res.json(clientes);
};

controller.getCliente = async (req, res) => {
    const { id } = req.params;
    const clientes = await utilities.executeQuery('SELECT * FROM Cliente WHERE idCliente = ?', [id]);
    res.json(clientes);
};

module.exports = controller;