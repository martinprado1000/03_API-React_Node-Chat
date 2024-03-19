const express = require("express");
const { Server } = require("socket.io"); //  npm i socket.io
const cors = require("cors");
const { Command } = require("commander");
const dotenv = require("dotenv");
const configEnvFn = require("./config.env/configEnv");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const initializePassport = require("./config.passport/passportConfig");

const MessagesService = require("./services/messagesService")
const messagesService = new MessagesService 


// Obtengo los argumentos, las variables de entorno y se lo paso al archivo config de mongo.
const program = new Command();
program.option("--mode <mode>", "Modo de trabajo", "dev"); // Por default ejecutamos en modo dev
program.parse(); // Finaliza la configuracion de argumentos
const options = program.opts(); // Obtengo los argumentos
dotenv.config({
  // Le indico a dotenv el path donde se encuentra las variables de entorno
  path: `src/.env.${options.mode}`, // path: inicia donde se hace el init de la app
});
console.log(`Sistema ejecutado en modo: ${options.mode}`);

const config = configEnvFn(); //Obtenemos las variables de entorno

// Conecion a la base de datos
const DbMongoSingleton = require("./connections/singleton");
const dbConnectionSingleton = DbMongoSingleton.getConnection(config);
//const CONNECTION_MONGO = DbMongoSingleton.urlConnection() // Obtengo la url de conexion para pasarselo a MongoStore para las sessiones.

const app = express();

app.use(express.json());
app.use(express(express.urlencoded({ extended: true })));
app.use( cors({
    origin: config.url_frontServer,
    credentials: true, // Es para permitie establecer las cookies en el front
  })
);
app.use(cookieParser()); // Middleware de cookie: conbierte las cookie en un objeto JSON.
initializePassport();
app.use(passport.initialize());

const usersRouter = require("./routers/usersRoutes");
const messagesRouter = require("./routers/messagesRoutes");

app.use("/api", usersRouter);
app.use("/api", messagesRouter);

const PORT = config.portServer
const httpServer = app.listen(PORT, () =>
  console.log(`Servidor express corriendo en el puerto ${PORT}`)
);

const io = new Server(httpServer, {
  cors: { origin: config.url_frontServer },
});


io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("message", (data) => {
    messagesService.post(data)
    socket.broadcast.emit("message", data);
  });

  // socket.emit: envia la data que queremos pasarle el front.
  // Importante: los emit SOLO pueden enviar strings.
  // socket.on("nombreDelMensaje", ((data)=>console.log(data)))
  // socket.emit("nombreDelMensaje", "Envio este mensaje solo al socket que debe recibir el mensaje")
  // socket.broadcast.emit("nombreDelMensaje", "Envio este mensaje a todos los sockets que estan conectados, menos al socket que envio el mensaje")
  // io.emit("nombreDelMensaje", "Este mensaje lo reciben todos los sockets conectados")
});
