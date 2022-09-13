-- Crean un usuario
CREATE USER 'coderhouse'@'localhost' IDENTIFIED BY 'coderhouse';

-- Asignan privilegios ALL a un usuario
GRANT ALL PRIVILEGES ON * . * TO 'coderhouse'@'localhost';

-- Se crea la base de datos
create database ecommerce;
