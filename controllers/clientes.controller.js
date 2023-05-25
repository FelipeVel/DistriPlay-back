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
    const { cedula, nombres, apellidos, usuario, correo, telefono, pais, contrasena, contrasena2 } = req.body;
    if (contrasena != contrasena2) {
        res.json({ status: 'Las contraseñas no coinciden' });
        return;
    }
    const usuarioRes = await utilities.executeQuery(`INSERT INTO usuario (usuario, contraseña,rol) VALUES ($1, $2, 'client')`, [usuario, contrasena]);
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

controller.loginCliente = async (req, res) => {
    const { usuario, contrasena } = req.body;
    const cliente = await utilities.executeQuery('SELECT * FROM cliente WHERE usuario = $1', [usuario]);
    if (cliente.error) {
        res.json({ status: 'Error al obtener cliente' });
        return;
    } else if (cliente.rows.length == 0) {
        res.json({ status: 'Cliente no encontrado' });
        return;
    }
    const usuarioRes = await utilities.executeQuery('SELECT * FROM usuario WHERE usuario = $1 AND contraseña = $2', [usuario, contrasena]);
    if (usuarioRes.error) {
        res.json({ status: 'Error al obtener usuario' });
        return;
    } else if (usuarioRes.rows.length == 0) {
        res.status(404).json({ status: 'Usuario no encontrado' });
        return;
    }
    const response = {
        ...cliente.rows[0],
        rol: usuarioRes.rows[0].rol
    }
    res.json({ status: 'Successful', data: response });
}

module.exports = controller;