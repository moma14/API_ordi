import express from 'express';
import config from './config';
import cors from 'cors';
import session from 'express-session';
import rutasdeUsuario from "./routes/usuarios.routes";
import chatRoutes from "./routes/chat.routes";

const app = express();
let port = config.port;

// Configuración del puerto
app.set('port', port);

// Middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: false }));

// Configurar sesiones
app.use(session({
    secret: config.SecretWord,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Cambiar a true si usas HTTPS
}));

app.use(rutasdeUsuario);
app.use(chatRoutes);
export default app;
