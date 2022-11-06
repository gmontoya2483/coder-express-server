# Servidor con express

## Consigna 1:

Sobre el proyecto del último desafío entregable, mover todas las claves y credenciales utilizadas a un archivo __.env__, y cargarlo mediante la librería __dotenv__.

La única configuración que no va a ser manejada con esta librería va a ser el puerto de escucha del servidor. Éste deberá ser leído de los argumento pasados por línea de comando, usando alguna librería (minimist o yargs). En el caso de no pasar este parámetro por línea de comandos, conectar por defecto al puerto 8080.  

Observación: por el momento se puede dejar la elección de sesión y de persistencia explicitada en el código mismo. Más adelante haremos también parametrizable esta configuración.  

## Consigna 2:

Agregar una ruta '/info' que presente en una vista sencilla los siguientes datos:  

- Argumentos de entrada
- Path de ejecución
- Nombre de la plataforma (sistema operativo)
- Process id
- Versión de node.js
- Carpeta del proyecto
- Memoria total reservada (rss)

## Consigna 3:

Agregar otra ruta '/api/randoms' que permita calcular un cantidad de números aleatorios en el rango del 1 al 1000 especificada por parámetros de consulta (query).  
Por ej: /randoms?cant=20000.  
Si dicho parámetro no se ingresa, calcular 100.000.000 números.  
El dato devuelto al frontend será un objeto que contendrá como claves los números random generados junto a la cantidad de veces que salió cada uno. Esta ruta no será bloqueante (utilizar el método fork de child process). Comprobar el no bloqueo con una cantidad de 500.000.000 de randoms.  

Observación: utilizar routers y apis separadas para esta funcionalidad.


## Ejecución en modo desarrollo

Para poder ejecutar el servidor en modo Desarrollo se debe tener instalado en forma global,``nodemon``.  
```console
npm install -g nodemon
```

Asimismo, se deben instalar en forma global los paquetes de ``forever`` y ``pm2``:
```condole
> npm install forever -g
> npm install pm2 -g
```



El siguiente script ejecuta el servidor utilizando ``nodemon`` utilizando el puerto __8080__ por defecto 
```console
> npm run dev 
```
El siguiente script ejecuta el servidor utilizando ``nodemon`` y le agrega el argumento en linea de comando ``-p 8081``

```console
> npm run dev:8081 
```

Tambien se pueden utilizar los siguientes comandos:

```console
> nodemon server.js [ -p <number> | --port <number> ] 
```

## Ejecución

```console
> npm start
```
ó

```console
> node server.js [ -p <number> | --port <number> ] 
```
