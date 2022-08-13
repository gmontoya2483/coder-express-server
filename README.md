# Servidor con express

## Consigna

1) Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos. En detalle, que incorpore las siguientes rutas:  
   - GET '/api/productos' -> devuelve todos los productos.
   - GET '/api/productos/:id' -> devuelve un producto según su id.
   - POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
   - PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
   - DELETE '/api/productos/:id' -> elimina un producto según su id.

2) Cada producto estará representado por un objeto con el siguiente formato:

 ```json
{
  "title": ",(nombre del producto)",
  "price": "(precio)",
  "thumbnail": "(url al logo o foto del producto)"
}
```

3) Cada ítem almacenado dispondrá de un id numérico proporcionado por el backend, comenzando en 1, y que se irá incrementando a medida de que se incorporen productos. Ese id será utilizado para identificar un producto que va a ser listado en forma individual.

4) Para el caso de que un producto no exista, se devolverá el objeto:   
`{ error : 'producto no encontrado' }`
5) Implementar la API en una clase separada, utilizando un array como soporte de persistencia en memoria.
6) Incorporar el Router de express en la url base '/api/productos' y configurar todas las subrutas en base a este.
7) Crear un espacio público de servidor que contenga un documento ``index.html`` con un formulario de ingreso de productos con los datos apropiados.
8) El servidor debe estar basado en express y debe implementar los mensajes de conexión al puerto 8080 y en caso de error, representar la descripción del mismo.
9) Las respuestas del servidor serán en formato JSON. La funcionalidad será probada a través de Postman y del formulario de ingreso.


## Ejecución

Para poder ejecutar el servidor en modo Desarrollo se debe tener instalado en forma global,``nodemon``.  
```console
npm install -g nodemon
```
Ejecutar el servidor:

```console
noode server.js
```
ó
```console
noodemon server.js
```

ó utilizando el script dev:
```console
npm run dev
```


