const express = require('express');
const Contenerdor = require('./src/Contenedor');
const PORT = process.env.PORT || 8080;

const contenedor = new Contenerdor('./db_files/productos.txt');


const app = express();
app.get('/productos', async (req, resp)=> {
    resp.send(await contenedor.getAll());
});

app.get('/productoRandom', async (req, resp)=> {
    resp.send(await contenedor.getRandom());
})

app.get('/*', async (req, resp)=> {
    resp.send(`404 - not found`);
});


const server = app.listen(PORT, ()=> {
    console.log(`Server on ->  ${JSON.stringify(server.address())}`);
    console.log()
});
