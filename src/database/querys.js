export const queries = {
    ObtenerTodosLosUsuarios: "SELECT * FROM usuarios",
    MandarMensaje: "INSERT INTO chat (idReceptor, idEmisor, chat) VALUES (?, ?, ?)",
    ObtenerMensajes: "SELECT * FROM chat WHERE idEmisor = ? AND idReceptor = ?",

};
