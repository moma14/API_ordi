import mysql from 'mysql2/promise';
import config from '../config';

const dbSettings = {
    host: config.dbServer,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbDataBase,
    waitForConnections: true,
    connectionLimit: 10, // Puedes ajustar este valor según tus necesidades
    queueLimit: 0
};

const pool = mysql.createPool(dbSettings);

export default pool;
