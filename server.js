/* ------------------- Modules ------------------- */
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const routerApiProductos = require("./src/routes/api.productos.routes");
const routerProductos = require("./src/routes/productos.routes");
const routerChat = require("./src/routes/chat.routes");
const Contenerdor = require("./src/Contenedor");

/*---------------------- Instancia de servidor ----------------------*/
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

/* ------------------- Middleware ------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));

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

app.get('/', async (req, res) => {
    const contenedor = new Contenerdor('./db_files/productos.txt')
    const products = await contenedor.getAll();
    res.render('new-product', { products });
});

app.use('/productos', routerProductos);
app.use('/api/productos', routerApiProductos);
app.use('/chat', routerChat);


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
        const contenedor = new Contenerdor('./db_files/chat.txt');
        const messages = await contenedor.getAll();
        socket.emit('from-server-messages', messages);
    })

    socket.on('from-client-message', async (mensaje) => {
        const contenedor = new Contenerdor('./db_files/chat.txt');
        await contenedor.create({ ...mensaje, date: new Date() });
        const messages = await contenedor.getAll();
        io.sockets.emit('from-server-messages', messages );
    });

    // Products handler
    socket.on('from-client-products', () => {
        console.log(`Cliente ${ socket.id } conectado a Productos`);
    })

    socket.on('from-client-new-product', async (product) => {
        const contenedor = new Contenerdor('./db_files/productos.txt');
        const { title, price, thumbnail } = product;
        const priceFloat = parseFloat(price);
        const newProduct= await contenedor.create({title, price:priceFloat, thumbnail});
        io.sockets.emit('from-sever-new-product', newProduct);
    });

});


