/* ------------------- Modules ------------------- */
import express from 'express';
import exphbs from 'express-handlebars';
import {fileURLToPath} from "url";
import path, { dirname } from 'path';
import { Server as HttpServer } from 'http';
import { Server as IOServer} from 'socket.io';


import {routerProductos} from "./src/routes/productos.routes.js";
import {routerChat} from "./src/routes/chat.routes.js";
import {ContenedorKnex} from "./src/contenedores/contenedorKnex.js";
import {routerApiProductos} from "./src/routes/api.productos.routes.js";
import {routerApiProductosTest} from "./src/routes/api.productos-test.routes.js";
import {routerLogin} from "./src/routes/login.route.js";
import {config} from "./src/utils/config.js";
import {ChatsDao, ProductosDao} from "./src/daos/index.js";
import {normalizeData} from "./src/utils/messages.normalize.js";

//session persistencia mongo
import connectMongo from 'connect-mongo';
import {Authorization} from "./src/middlewares/auth.middleware.js";
import session from "express-session";
import {routerLogout} from "./src/routes/logout.route.js";
import {routerRegister} from "./src/routes/register.route.js";
import passport from "passport";

// MongoStore (session)
const MongoStore = connectMongo.create({
    mongoUrl:config.mongo_db.url,
    ttl: 600
});


/* -------------------- Dirname ----------------------------*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/*---------------------- Instancia de servidor ----------------------*/
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

/* ------------------- Middleware ------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));

// Session Setup
app.use(session({
    store: MongoStore,
    secret: config.mongo_db.secret_key,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


//Motor de plantillas
app.set('views', path.join(__dirname,'./src/views'));
app.set('view engine', 'hbs');
app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs'
}));


/* ------------------- Routes ------------------- */



app.get('/',[Authorization], async (req, res) => {
    const contenedor = new ContenedorKnex(config.stock_db, 'productos');
    const products = await contenedor.getAll();
    await contenedor.closeConnection();
    res.render('new-product', { products, username: req.session.username });
});

app.use('/productos', [Authorization] ,routerProductos);
app.use('/api/productos' ,routerApiProductos );
app.use('/api/productos-test',routerApiProductosTest);
app.use('/chat',  [Authorization], routerChat);
app.use('/login', routerLogin);
app.use('/register', routerRegister);
app.use('/logout', [Authorization], routerLogout);

/* ------------------- Middleware Errores ------------------- */
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

/* ------------------- Server ------------------- */
const PORT = process.env.PORT || 8080;
const server = httpServer.listen(PORT, ()=> {
    console.log(`Server on ->  ${JSON.stringify(server.address())}`);
});
server.on('error', error => {
    console.error(`Error en el servidor ${error}`);
});

/* ---------------------- WebSocket ----------------------*/
io.on('connection', (socket)=>{
    socket.emit('from-server-request-socket-handler');


    // Chat handler
    socket.on('from-client-chat', async () => {
        console.log(`Cliente ${ socket.id } conectado al chat`);
        // const contenedor = new ContenedorKnex(config.chat_db, 'mensajes')
        const contenedor = new ChatsDao();
        const messages = await contenedor.getAll();
        await contenedor.closeConnection();
        const normalizedMessages = normalizeData(messages);
        socket.emit('from-server-messages', normalizedMessages); //TODO: normalizar
    })

    socket.on('from-client-message', async (mensaje) => {
        const contenedor = new ChatsDao()
        await contenedor.create({ ...mensaje, date: new Date() });
        const messages = await contenedor.getAll();
        await contenedor.closeConnection();
        const normalizedMessages = normalizeData(messages);
        io.sockets.emit('from-server-messages', normalizedMessages ); //TODO: normalizar
    });

    // Products handler
    socket.on('from-client-products', () => {
        console.log(`Cliente ${ socket.id } conectado a Productos`);
    })

    socket.on('from-client-new-product', async (product) => {
        const contenedor = new ProductosDao();
        const { title, price, thumbnail } = product;
        const priceFloat = parseFloat(price);
        const newProduct= await contenedor.create({title, price:priceFloat, thumbnail});
        await contenedor.closeConnection();
        io.sockets.emit('from-sever-new-product', {title, price, thumbnail});
    });

});


