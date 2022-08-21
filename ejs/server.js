/* ------------------- Modules ------------------- */
const express = require('express');
const path = require('path');

const routerApiProductos = require("./src/routes/api.productos.routes");
const routerProductos = require("./src/routes/productos.routes");

const app = express();

/* ------------------- Middleware ------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));

//Motor de plantillas
app.set('views', path.join(__dirname,'./src/views'));
app.set('view engine', 'ejs');

/* ------------------- Routes ------------------- */

app.get('/', (req, res) => {
    res.render('new-product');
});

app.use('/api/productos', routerApiProductos);
app.use('/productos', routerProductos);


/* ------------------- Middleware Errores ------------------- */
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


/* ------------------- Server ------------------- */
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=> {
    console.log(`Server on ->  ${JSON.stringify(server.address())}`);
});
server.on('error', error => {
    console.error(`Error en el servidor ${error}`);
});
