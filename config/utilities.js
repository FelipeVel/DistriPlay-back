const { Client } = require('pg');

const connectionData = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
};

const executeQuery = async (query, params = []) => {
    const client = new Client(connectionData);
    const queryToExecute = {
        text: query,
        values: params
    }
    try {
        await client.connect();
        console.log(query, params)
        const res = await client.query(queryToExecute);
        client.end();
        return res;
    } catch (err) {
        console.error(err.stack);
        client.end();
        return {error: err.stack};
    }
}

const formatoFecha = (fecha) => {
    const day = fecha.getDate();
    const month = fecha.getMonth() > 8 ? fecha.getMonth() + 1 : `0${fecha.getMonth() + 1}`;
    const year = fecha.getFullYear()
    return `${year}-${month}-${day}`;
}

module.exports = {
    executeQuery,
    formatoFecha
}
