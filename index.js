const express = require("express"),
    app = express(),
    puerto = process.env.PORT || 3080,
    bodyParser = require('body-parser');

require('dotenv').config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));
app.use(express.static('static'));

// Rutas
app.use('/clientes', require('./routes/clientes.routes'));
app.use('/juegos', require('./routes/juegos.routes'));
app.use('/compras', require('./routes/compras.routes'));

app.listen(puerto, err => {
    if (err) {
        console.error("Error escuchando: ", err);
        return;
    }
    console.log(`Escuchando en el puerto :${puerto}`);
});