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
    try {
        await client.connect();
        const res = await client.query(query, params);
        client.end();
        return res;
    } catch (err) {
        console.log(err.stack);
        client.end();
        return err;
    }
}

module.exports = {
    executeQuery,
}
