/* ------------------- Modules ------------------- */
const express = require('express');
const routerProductos = require("./src/routes/productos.routes");

const app = express();

/* ------------------- Middleware ------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));


/* ------------------- Routes ------------------- */
app.use('/api/productos', routerProductos);


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
