const utilities = require("../config/utilities");

const controller = {};

controller.getJuegos = async (req, res) => {
    const queryFilters = req.query;
    let query = 'SELECT * FROM Videojuego';
    let params = [];
    if (queryFilters) {
        query += ' WHERE';
        if (queryFilters.nombre) {
            query += ' nombre LIKE ?';
            params.push(`%${queryFilters.pull}%`);
            delete queryFilters.nombre;
            if (Object.keys(queryFilters).length > 0) {
                query += ' AND';
            }
        }
        if (queryFilters.genero) {
            query += ' genero LIKE ?';
            params.push(`%${queryFilters.genero}%`);
            delete queryFilters.genero;
            if (Object.keys(queryFilters).length > 0) {
                query += ' AND';
            }
        }
        if (queryFilters.plataforma) {
            query += ' plataforma LIKE ?';
            params.push(`%${queryFilters.plataforma}%`);
            delete queryFilters.plataforma;
            if (Object.keys(queryFilters).length > 0) {
                query += ' AND';
            }
        }
        if (queryFilters.costoMax) {
            query += ' costo <= ?';
            params.push(queryFilters.costoMax);
            delete queryFilters.costoMax;
            if (Object.keys(queryFilters).length > 0) {
                query += ' AND';
            }
        }
        if (queryFilters.costoMin) {
            query += ' costo >= ?';
            params.push(queryFilters.costoMin);
            delete queryFilters.costoMin;
            if (Object.keys(queryFilters).length > 0) {
                query += ' AND';
            }
        }
        if (queryFilters.idioma) {
            query += ' idioma LIKE ?';
            params.push(`%${queryFilters.idioma}%`);
            delete queryFilters.idioma;
            if (Object.keys(queryFilters).length > 0) {
                query += ' AND';
            }
        }
        if (queryFilters.clasificacion) {
            query += ' clasificacion LIKE ?';
            params.push(`%${queryFilters.clasificacion}%`);
            delete queryFilters.clasificacion;
            if (Object.keys(queryFilters).length > 0) {
                query += ' AND';
            }
        }
        if (queryFilters.productor) {
            query += ' productor LIKE ?';
            params.push(`%${queryFilters.productor}%`);
            delete queryFilters.productor;
        }
    }
    const juegos = await utilities.executeQuery(query, params);
    if (juegos.stack) {
        res.json({ status: 'Error al obtener juegos' });
    }
    res.json(juegos);
};

controller.getJuego = async (req, res) => {
    const { id } = req.params;
    const juegos = await utilities.executeQuery('SELECT * FROM Videojuego WHERE idVideojuego = ?', [id]);
    if (juegos.stack) {
        res.json({ status: 'Error al obtener juego' });
    }
    res.json(juegos);
};

controller.getJuegoByNombre = async (req, res) => {
    const { nombre } = req.params;
    const juegos = await utilities.executeQuery('SELECT * FROM Videojuego WHERE nombre = ?', [nombre]);
    if (juegos.stack) {
        res.json({ status: 'Error al obtener juego' });
    }
    res.json(juegos);
};

module.exports = controller;