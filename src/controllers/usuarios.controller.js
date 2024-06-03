import pool from '../database/connection'; // Importa el pool de conexiones en lugar de getConnection
import bcrypt from "bcryptjs";
import { queries } from '../database/querys';

export const obtenerTodosLosUsuarios = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute(queries.ObtenerTodosLosUsuarios);
        connection.release();
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener todos los usuarios:', error);
        res.status(500).json({ error: 'Error al obtener todos los usuarios' });
    }
};

export const Login = async (req, res) => {
    const { email, passwordHash } = req.body;

    if (!email || !passwordHash) {
        if (!email) {
            return res.status(400).send({ message: 'Email requerido' });
        } else {
            return res.status(400).send({ message: 'Contraseña requerida' });
        }
    }

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        connection.release();

        if (rows.length > 0) {
            const user = rows[0];
            const match = await bcrypt.compare(passwordHash, user.passwordHash);

            if (match) {
                res.status(200).json({ message: "Login Exitoso" });
            } else {
                res.status(401).json({ message: "Email o contraseña incorrectas" });
            }
        } else {
            res.status(401).json({ message: "Email o contraseña incorrectas" });
        }
    } catch (error) {
        console.error('Error del servidor: ', error);
        res.status(500).send({ message: 'Error del servidor' });
    }
};

export const Registro = async (req, res) => {
    const { usuario, email, passwordHash } = req.body;

    if (!usuario || !email || !passwordHash) {
        return res.status(400).send({ message: 'Rellene los campos' });
    }

    try {
        const connection = await pool.getConnection();
        const [result] = await connection.execute(
            'INSERT INTO usuarios (usuario, email, passwordHash) VALUES (?, ?, ?)',
            [usuario, email, passwordHash]
        );
        connection.release();

        if (result.affectedRows > 0) {
            return res.status(201).send({ message: 'Usuario Creado Exitosamente' });
        } else {
            return res.status(500).send({ message: 'Error al crear el usuario' });
        }
    } catch (error) {
        console.error("Error during user registration: ", error);
        return res.status(500).send({ message: 'Error Interno del Servidor' });
    }
};
