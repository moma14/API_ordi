import { getConnection } from '../database/connection';
import bcrypt from "bcryptjs"

// controlador.js
import { queries } from '../database/querys';
// Función para obtener todos los usuarios
export async function obtenerTodosLosUsuarios(req, res) {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute(queries.ObtenerTodosLosUsuarios);
        res.json(rows); // Enviar los usuarios como respuesta en formato JSON
    } catch (error) {
        console.error('Error al obtener todos los usuarios:', error);
        res.status(500).json({ error: 'Error al obtener todos los usuarios' }); // Enviar una respuesta de error en caso de fallo
    }
}



export const Login = async (req, res) => {
    const { email, passwordHash } = req.body;

    // Verificar que email y password no sean undefined
    if (!email || !passwordHash) {

        if (!email) {
            return res.status(400).send({ message: 'Email requerido' });
        } else {
            return res.status(400).send({ message: 'contraseña requerido' });
        }
    }

    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM usuarios WHERE email = ?', [email]);

        if (rows.length > 0) {
            const user = rows[0];

            // Compara el hash de la contraseña almacenada con la contraseña proporcionada
            const match = await bcrypt.compare(passwordHash, user.passwordHash);

            if (match) {
                res.status(200).json({ message: "Login Exitoso" });
            } else {
                res.status(401).json({ message: "email o password incorrectas" });
            }
        } else {
            res.status(401).json({ message: "email o password incorrectas" });
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

        const connection = await getConnection();
        const [result] = await connection.execute(
            'INSERT INTO usuarios (usuario, email, passwordHash) VALUES (?, ?, ?)',
            [usuario, email, passwordHash]
        );

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
