# Servidor con express

## Consigna:

Dividir en capas el proyecto entregable con el que venimos trabajando (entregable clase 16: loggers y profilers), agrupando apropiadamente las capas de ruteo, controlador, lógica de negocio y persistencia.  

Considerar agrupar las rutas por funcionalidad, con sus controladores, lógica de negocio con los casos de uso, y capa de persistencia.  

La capa de persistencia contendrá los métodos necesarios para atender la interacción de la lógica de negocio con los propios datos.  


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
