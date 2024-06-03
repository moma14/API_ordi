import { Router } from 'express';
import pool from '../database/connection'; // Ajusta la ruta según la ubicación de tu archivo de conexión
import { queries } from '../database/querys';

const router = Router();

// Ruta para enviar un mensaje
router.post('/api/send-message', async (req, res) => {
    const { chat, idReceptor, idEmisor, multimedia } = req.body;
    if (chat && idReceptor && idEmisor) {
        try {
            const [rows] = await pool.execute(queries.MandarMensaje, [idEmisor, idReceptor, chat]); // Utilizamos prepared statements para evitar inyecciones SQL

            if (rows.affectedRows > 0) {
                res.json({ success: true, message: 'Mensaje enviado correctamente' });
            } else {
                res.status(500).json({ success: false, message: 'Error al enviar el mensaje' });
            }
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
            res.status(500).json({ success: false, message: 'Error al enviar el mensaje' });
        }
    } else {
        res.status(400).json({ success: false, message: 'chat, idReceptor, or idEmisor missing' });
    }
});

// Ruta para obtener mensajes entre dos usuarios
router.get('/api/get-messages/:idEmisor/:idReceptor', async (req, res) => {
    const { idEmisor, idReceptor } = req.params;
    try {
        const [rows] = await pool.execute(queries.ObtenerMensajes, [idEmisor, idReceptor]);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener los mensajes:', error);
        res.status(500).json({ success: false, message: 'Error al obtener los mensajes' });
    }
});

export default router;
