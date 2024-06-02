import { Router } from 'express';
const router = Router();

let messages = [];

router.post('/send-message', (req, res) => {
    const { message, user } = req.body;
    if (message && user) {
        const newMessage = { message, user, timestamp: new Date() };
        messages.push(newMessage);
        res.json({ success: true, newMessage });
    } else {
        res.status(400).json({ success: false, message: 'Message or user missing' });
    }
});

router.get('/get-messages', (req, res) => {
    res.json(messages);
});

export default router;
