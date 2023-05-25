const utilities = require("../config/utilities");

const controller = {};

controller.getJuegos = async (req, res) => {
    const queryFilters = req.query;
    let {limit} = queryFilters;
    if (limit) {
        delete queryFilters.limit;
    }
    console.log(queryFilters);
    let query = 'SELECT * FROM videojuego';
    let params = [];
    let count = 0;
    if (Object.keys(queryFilters).length > 0) {
        query += ' WHERE';
        if (queryFilters.nombre) {
            count++;
            query += ' nombre LIKE $'+count;
            params.push(`%${queryFilters.nombre}%`);
            delete queryFilters.nombre;
            if (Object.keys(queryFilters).length > 0) {
                query += ' AND';
            }
        }
        if (queryFilters.genero) {
            count++;
            query += ' genero LIKE $'+count;
            params.push(`%${queryFilters.genero}%`);
            delete queryFilters.genero;
            if (Object.keys(queryFilters).length > 0) {
                query += ' AND';
            }
        }
        if (queryFilters.plataforma) {
            count++;
            query += ' plataforma LIKE $'+count;
            params.push(`%${queryFilters.plataforma}%`);
            delete queryFilters.plataforma;
            if (Object.keys(queryFilters).length > 0) {
                query += ' AND';
            }
        }
        if (queryFilters.costoMax) {
            count++;
            query += ' costo <= $'+count;
            params.push(queryFilters.costoMax);
            delete queryFilters.costoMax;
            if (Object.keys(queryFilters).length > 0) {
                query += ' AND';
            }
        }
        if (queryFilters.costoMin) {
            count++;
            query += ' costo >= $'+count;
            params.push(queryFilters.costoMin);
            delete queryFilters.costoMin;
            if (Object.keys(queryFilters).length > 0) {
                query += ' AND';
            }
        }
        if (queryFilters.idioma) {
            count++;
            query += ' idioma LIKE $'+count;
            params.push(`%${queryFilters.idioma}%`);
            delete queryFilters.idioma;
            if (Object.keys(queryFilters).length > 0) {
                query += ' AND';
            }
        }
        if (queryFilters.clasificacion) {
            count++;
            query += ' clasificacion LIKE $'+count;
            params.push(`%${queryFilters.clasificacion}%`);
            delete queryFilters.clasificacion;
            if (Object.keys(queryFilters).length > 0) {
                query += ' AND';
            }
        }
        if (queryFilters.productor) {
            count++;
            query += ' productor LIKE $'+count;
            params.push(`%${queryFilters.productor}%`);
            delete queryFilters.productor;
        }
    }
    if (limit) {
        count++;
        query += ' LIMIT $'+count;
        params.push(limit);
    }
    const juegos = await utilities.executeQuery(query, params);
    if (juegos.error) {
        res.json({ status: 'Error al obtener juegos' });
    } else
    res.json(juegos.rows);
};

controller.getJuego = async (req, res) => {
    const { id } = req.params;
    const juegos = await utilities.executeQuery('SELECT * FROM videojuego WHERE id= $1', [id]);
    if (juegos.error) {
        res.json({ status: 'Error al obtener juego' });
    } else
    res.json(juegos.rows[0]);
};

controller.getJuegoByNombre = async (req, res) => {
    const { nombre } = req.params;
    const juegos = await utilities.executeQuery('SELECT * FROM videojuego WHERE nombre = $1', [nombre]);
    if (juegos.error) {
        res.json({ status: 'Error al obtener juego' });
    } else
    res.json(juegos.rows[0]);
};

controller.createJuego = async (req, res) => {
    const { userId, nombre, genero, plataforma, costo, idioma, clasificacion, productor, imagen } = req.body;
    const rol = await utilities.executeQuery('SELECT rol FROM usuario WHERE usuario = $1', [userId]);
    if (rol.rows[0].rol === 'admin') {
        const juegos = await utilities.executeQuery('INSERT INTO videojuego (nombre, genero, plataforma, costo, idioma, clasificacion, productor, imagen) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [nombre, genero, plataforma, costo, idioma, clasificacion, productor, imagen]);
        if (juegos.error) {
            res.json({ status: 'Error al crear juego' });
        } else
        res.json({ status: 'Juego creado' });
    } else {
        res.status(500).json({ status: 'No tienes permisos para crear juegos' });
    }
};

controller.updateJuego = async (req, res) => {
    const { userId, id, nombre, genero, plataforma, costo, idioma, clasificacion, productor, imagen } = req.body;
    const rol = await utilities.executeQuery('SELECT rol FROM usuario WHERE usuario = $1', [userId]);
    if (rol.rows[0].rol === 'admin') {
        const juegos = await utilities.executeQuery('UPDATE videojuego SET nombre = $1, genero = $2, plataforma = $3, costo = $4, idioma = $5, clasificacion = $6, productor = $7, imagen = $8 WHERE id = $9', [nombre, genero, plataforma, costo, idioma, clasificacion, productor, imagen, id]);
        if (juegos.error) {
            res.json({ status: 'Error al actualizar juego' });
        } else
        res.json({ status: 'Juego actualizado' });
    } else {
        res.status(500).json({ status: 'No tienes permisos para actualizar juegos' });
    }
};

controller.deleteJuego = async (req, res) => {
    const { userId, id } = req.body;
    const rol = await utilities.executeQuery('SELECT rol FROM usuario WHERE usuario = $1', [userId]);
    if (rol.rows[0].rol === 'admin') {
        const deleteCompras = await utilities.executeQuery('DELETE FROM compra_videojuego WHERE juego IN (SELECT id FROM videojuego WHERE id = $1)', [id]);
        if (deleteCompras.error) {
            res.status(500).json({ status: 'Error al eliminar compras' });
            return;
        }
        const juegos = await utilities.executeQuery('DELETE FROM videojuego WHERE id = $1', [id]);
        if (juegos.error) {
            res.status(500).json({ status: 'Error al eliminar juego' });
        } else
        res.json({ status: 'Juego eliminado' });
    } else {
        res.status(500).json({ status: 'No tienes permisos para eliminar juegos' });
    }
};

module.exports = controller;