# Servidor con express

## Consigna 1:

Incorporar al proyecto de servidor de trabajo la compresión gzip.  

Verificar sobre la ruta /info con y sin compresión, la diferencia de cantidad de bytes devueltos en un caso y otro.  

Luego implementar loggueo (con alguna librería vista en clase) que registre lo siguiente:  
- Ruta y método de todas las peticiones recibidas por el servidor (info)
- Ruta y método de las peticiones a rutas inexistentes en el servidor (warning)
-Errores lanzados por las apis de mensajes y productos, únicamente (error)

Considerar el siguiente criterio:  
- Loggear todos los niveles a consola (info, warning y error)
- Registrar sólo los logs de warning a un archivo llamada warn.log
- Enviar sólo los logs de error a un archivo llamada error.log



## Consigna 2:
Luego, realizar el análisis completo de performance del servidor con el que venimos trabajando.  

Vamos a trabajar sobre la ruta '/info', en modo fork, agregando ó extrayendo un console.log de la información colectada antes de devolverla al cliente. Además desactivaremos el child_process de la ruta '/randoms'  

Para ambas condiciones (con o sin console.log) en la ruta '/info' OBTENER:  
1) El perfilamiento del servidor, realizando el test con --prof de node.js. Analizar los resultados obtenidos luego de procesarlos con --prof-process.  
Utilizaremos como test de carga Artillery en línea de comandos, emulando 50 conexiones concurrentes con 20 request por cada una. Extraer un reporte con los resultados en archivo de texto.

Luego utilizaremos Autocannon en línea de comandos, emulando 100 conexiones concurrentes realizadas en un tiempo de 20 segundos. Extraer un reporte con los resultados (puede ser un print screen de la consola)  

2) El perfilamiento del servidor con el modo inspector de node.js --inspect. Revisar el tiempo de los procesos menos performantes sobre el archivo fuente de inspección.
3) El diagrama de flama con 0x, emulando la carga con Autocannon con los mismos parámetros anteriores.  
 Realizar un informe en formato pdf sobre las pruebas realizadas incluyendo los resultados de todos los test (texto e imágenes).  
   👉 Al final incluir la conclusión obtenida a partir del análisis de los datos.


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

### Ejecución con _nodemon_

- Modo __fork__

    - El siguiente script ejecuta el servidor utilizando ``nodemon`` utilizando el puerto __8080__ por defecto 
    ```console
    > npm run dev:fork 
    ```
    - El siguiente script ejecuta el servidor utilizando ``nodemon`` y le agrega el argumento en linea de comando ``-p 8081``

    ```console
    > npm run dev:fork:8081 
    ```

- Modo __cluster__

  - El siguiente script ejecuta el servidor en modo cluster utilizando ``nodemon`` utilizando el puerto __8080__ por defecto
    ```console
    > npm run dev:cluster
    ```

  - El siguiente script ejecuta el servidor en modo cluster utilizando ``nodemon`` utilizando el puerto __8081__
    ```console
    > npm run dev:cluster:8081
    ```

- También se pueden utilizar los siguientes comandos:

    ```console
    > nodemon server.js [ -p <number> | --port <number> ] [ -m <FORK | CLUSTER> | --mode <FORK | CLUSTER>]
    ```

### Ejecución con _forever_ (Modo watch)

- El siguiente script ejecuta el servidor con ``forever`` en el puerto __8080__.
    ```console
    > npm run forever:8080
    ```

- El siguiente script ejecuta el servidor con ``forever`` en el puerto __8081__.
    ```console
    > npm run forever:8081
    ```
- También se pueden utilizar el siguiente comando:
    ```console
    > forever [ -w | --watch ] start server.js [ -p <number> | --port <number> ] [ -m <FORK | CLUSTER> | --mode <FORK | CLUSTER>]
    ```
- Listar procesos de __forever__
    ```console
    > forever list
    ```
- Detener procesos de __forever__
    ```console
    > forever stop <Id|Uid|Pid|Index|Script>
    ```

    ```console
    > forever stopall
    ```

### Ejecución con _PM2_ (Modo watch)

- Modo __fork__

  ```console
  > npm run pm2:fork:8080
  ```
  
  ó
  
  ```console
  > npm run pm2:fork:8081
  ```

  ó

  ```console
  > pm2 start server.js --watch [--name="<name>"] -- [-p <port_number> | --port <port_number>]
  ```

- Modo __cluster__

  ```console
  > npm run pm2:cluster:8080
  ```

  ó

  ```console
  > npm run pm2:cluster:8081
  ```

  ó

  ```console
  > pm2 start server.js --watch -i max [--name="<name>"] -- [-p <port_number> | --port <port_number>]
  ```


## Cluster nginx

Se adjuntan 2 archivos en la carpeta nginx_config:

- ``nginx.conf_1``: Redirige todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto __8081__ y el resto de las peticiones al puerto __8080__.
- ``nginx.conf_2``: Todas las consultas a /api/randoms son redirigidas a un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.

## Ejecución en producción

```console
> npm start
```
ó

```console
> node server.js [ -p <number> | --port <number> ] [ -m <FORK | CLUSTER> | --mode <FORK | CLUSTER>]
```
