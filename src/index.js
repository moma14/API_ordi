import app from "./app";
import "./database/connection";


app.listen(app.get("port"));


console.log("servidor escuchando en el puerto ", app.get("port"));