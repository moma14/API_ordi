export const queries = {
    ObtenerTodosLosUsuarios: "SELECT * FROM usuarios",
    MandarMensaje: "INSERT INTO Mensajes (emisor_id, receptor_id, mensaje) VALUES (?, ?, ?)",
};
