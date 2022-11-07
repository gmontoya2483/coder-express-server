# Servidor con express

## Consigna 1:

Tomando con base el proyecto que vamos realizando, agregar un parámetro más en la ruta de comando que permita ejecutar al servidor en modo fork o cluster. Dicho parámetro será 'FORK' en el primer caso y 'CLUSTER' en el segundo, y de no pasarlo, el servidor iniciará en modo fork.
- Agregar en la vista info, el número de procesadores presentes en el servidor.
- Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.
- Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo.
- Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo.
- Tanto en Forever como en PM2 permitir el modo escucha, para que la actualización del código del servidor se vea reflejado inmediatamente en todos los procesos.
- Hacer pruebas de finalización de procesos fork y cluster en los casos que corresponda.


## Consigna 2:
Configurar Nginx para balancear cargas de nuestro servidor de la siguiente manera:  

Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster.  

El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080.  
Verificar que todo funcione correctamente.  

Luego, modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.



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
