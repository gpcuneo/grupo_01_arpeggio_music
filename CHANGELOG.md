# Registro de cambios
Todos los cambios notables en este proyecto se documentarán en este archivo.

El formato se basa en [Keep a Changelog](http://keepachangelog.com/) y este proyecto se adhiere a [Semantic Versioning](http://semver.org/).

## Sprint7 - 2023-08-16
- Nuevas características:
  - Se implemento modal de aceptacion de cookies
  - Se agrega renderizado de productos dinamico en la home
  - Se agrega renderizado de las categorias dinamico en la home
  - Se agrega renderizado de productos dinamico en el store

- Mejoras:
  - Se agregaron validaciones a todos los campos de alta y edicion de usuarios
  - Se agregaron validaciones a todos los campos de alta y edicion productos
  - Se agregaron validaciones a todos los campos de alta y edicion de categorias
  - Se agregaron limites a la subida de imagenes de perfil de usuario
  - Se agregaron limites a la subida de imagenes de perfil de productos
  - Se agregaron limites a la subida de imagenes de perfil de categorias


- Correcciones de errores:
  - Se corrigieron errores sobre el menu desplegable


## Sprint6 - 2023-06-02
- Nuevas características:
  - Se agrega vista de administracion.
  - Se implementa menu desplegable en el logo del usuario con opcions de perfil y adminstracion.
  - Se implementa menu desplegable en la version mobile.
  - Se agrega busqueda de productos.
  - Se agrega busqueda de usuarios.
  - Se agrega paginado de usuarios.
  - 
- Mejoras:
  - Se integra modelo de base de datos a la aplicacion para persistencia de datos.
  - Implementacion de ORM sequelize para uso de la base de datos sobre mysql.
  - CRUDs de productos, categorias y usuarios adaptados completamente al uso del ORM.
  - Se adiciona script de SQL para la creacion de las tablas y poblacion con datos de las mismas.
  - Se integra solucion de entorno de desarrollo sobre contenedores docker.
  - Se crea automatizacion de despliegue de la base de datos mediante Migration y Seeders de Sequelize.
  - Se implementa provincias y localidades en los selectores del formulario de registro de usuarios.

- Correcciones de errores:
  - Se soluciona problema de redireccion de mniddleware que verifica rol de adminstrador
  - Se centra el logo de perfil de usuario en la version mobile.
