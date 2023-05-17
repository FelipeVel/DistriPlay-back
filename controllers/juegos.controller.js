const utilities = require("../config/utilities");

const controller = {};

controller.getJuegos = async (req, res) => {
    const queryFilters = req.query;
    console.log(queryFilters);
    let query = 'SELECT * FROM videojuego';
    let params = [];
    if (Object.keys(queryFilters).length > 0) {
        query += ' WHERE';
        let count = 0;
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

module.exports = controller;