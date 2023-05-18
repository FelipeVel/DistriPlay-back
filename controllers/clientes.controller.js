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

controller.createCliente = async (req, res) => {
    const { cedula, nombres, apellidos, usuario, correo, telefono, pais, contrasena } = req.body;
    const usuarioRes = await utilities.executeQuery('INSERT INTO usuario (usuario, contraseña) VALUES ($1, $2)', [usuario, contrasena]);
    if (usuarioRes.error) {
        res.json({ status: 'Error al crear usuario' });
        return;
    }
    const clienteRes = await utilities.executeQuery('INSERT INTO cliente (cedula, nombres, apellidos, usuario, correo, telefono, pais) VALUES ($1, $2, $3, $4, $5, $6, $7)', [cedula, nombres, apellidos, usuario, correo, telefono, pais]);
    if (clienteRes.error) {
        res.json({ status: 'Error al crear cliente' });
        return;
    }
    res.json({ status: 'Successful'});
}

module.exports = controller;