import mysql from 'mysql2/promise';
import config from '../config'
const dbsettings = {
    host: config.dbServer,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbDataBase
};

export async function getConnection() {
    try {
        const connection = await mysql.createConnection(dbsettings);
        return connection;
    } catch (error) {
        console.error("Error de conexión a la base de datos: ", error);
    }
}


export {mysql};