# Grupo 1 - Arpeggio Music

Tematica: Somos una tienda especializada en la venta de instrumentos musicales.

Publico objetivo: Adolescentes y adultos, tanto aficionados como profesionales del ambito musical.

Sitios referentes: 

- [https://www.baires.rocks/](https://www.baires.rocks/)
- [https://www.get-back.com.ar/](https://www.get-back.com.ar/?gclid=CjwKCAjw586hBhBrEiwAQYEnHXWJW3tRSqN8CNX6p4UaAanXPZN2R-8btROConfWkkuVudbo5BJyXxoCDhwQAvD_BwE)
- [https://taketones.com/](https://taketones.com/)
- [https://www.stylestore.com.ar/instrumentos-musicales?page=2&gclid=CjwKCAjw586hBhBrEiwAQYEnHRdIVIx3DgeFu0bifqtUjIM2SimY1RPyDseph1iaWsxXTM5xrMwxUhoCayEQAvD_BwE](https://www.stylestore.com.ar/instrumentos-musicales?page=2&gclid=CjwKCAjw586hBhBrEiwAQYEnHRdIVIx3DgeFu0bifqtUjIM2SimY1RPyDseph1iaWsxXTM5xrMwxUhoCayEQAvD_BwE)
- [https://usmusicstore.com/](https://usmusicstore.com/)
- [https://www.lacasadelinstrumentomusical.com.ar/](https://www.lacasadelinstrumentomusical.com.ar/)


Integrantes del grupo: 

Guillermo Cuneo: Tengo 39 años y vivo en Martin Coronado (Partido de 3 de Febrero - Bs As). Soy Licenciado en gestión de la información y poseo una trayectoria de más de 20 años en el apasionante mundo de la tecnología, con amplia experiencias en áreas de soporte, operaciones de datacenter, implementación de proyectos de infraestructura tecnológica, desarrollo, automatización de procesos y devops, con fuerte foco en la mejora continua del negocio y la generación de valor.

Rebeca Anahi Luna Colque: Tengo 22 años, vivo en Ingeniero Budge( Partido de Lomas de Zamora - Bs. As.) estudié en una escuela técnica de ingeniería industrial, y después estudié arquitectura un año en la FADU y lo dejé porque eran muchos años de estudio y además si pensaba trabajar y estudiar a la vez iban a ser más, por lo tanto lo dejé y comencé solo a trabajar en comercio. Conocí la programación por mi primo quién ya estaba trabajando en ello y me comentó acerca de Digital House donde también estudió y egresó de ahí, y bueno estoy aquí aprendió lo que es programación.

Maximiliano Martinez: Hola soy Maximiliano Martinez, tengo 26 años,soy estudiante de biología, vivo en la ciudad de córdoba y estoy aprendiendo a programar para poder trabajar algún día ya que me está interesando mucho

Agustina Rodriguez: Tengo 34 años, vivo en Roque Pérez (Pcia. de Buenos Aires). Soy arquitecta y docente en nivel medio. Este año decidí comenzar a estudiar Programación, porque quiero producir cambios en mi área laboral y quiero permitirme conocer otras opciones de trabajo, otras realidades y aspiraciones. 

Link al board de Trello: [https://trello.com/b/Emsmc07T/dggrupo01arpeggiomusic](https://trello.com/b/Emsmc07T/dggrupo01arpeggiomusic)



---

# **Ejecutar entorno de desarrollo en contenedores Docker**

**1- Clonar la rama sprint6 del proyecto :**

```bash
git clone -b sprint6 git@github.com:gpcuneo/grupo_01_arpeggio_music.git
```

**2- Configure el archivo .env para cargar las variables de entorno:**

Renombre o copie el archivo .env.template por .env y modifique las variables de entorno segun sus necesidades, por ejemplo, si ya posee una aplicacion corriendo en el puerto 3000 cambie el puerto de esta mediante las variables de entorno:

```bash
# Modifique el archivo en base a su entorno
APP_NAME=Arpegio                # Nombre de la aplicacion
APP_VERSION=1.0                 # Version de la aplicacion
APP_SESSION_SECRET=Reemplazar   # Secreto de la aplicacion
APP_PORT=3000                   # Puerto de la aplicacion
DB_HOST=Arpegio-db              # Nombre de host del servidor de base de datos
DB_PORT=3306                    # Puerto del servidor de base de datos
DB_DIALECT=mysql                # Motor de base de datos
DB_DATABASE=database            # Nombre de la base de datos
DB_USER=appuser                 # Usuario de coneccion de la base de datos
DB_PASSWORD=apppass             # Password de coneccion del usuario de la base de datos
DB_ROOT_PASSWORD=password       # Password de mysql root
PMA_WEB_PORT=8080               # Puerto para conectarse al PHPMyAdmin
PMA_ARBITRARY=1                 # PMA para PHPMyAdmin
```

**3- Instalar las dependencias en el hostlocal:**
Esto se requiere debido a que luego montaremos este directorio en el contenedor:

```bash
npm i
```

**4- Ejecutar entorno de desarrollo (nodemon):**

```bash
docker compose -f docker-compose.dev.yaml up -d
```

Comenzara un proceso de build de la aplicacion y luego el deploy de los 3 contenedores:
- Arpegio-db: Contenedor de la base de datos (mysql)
- Arpegio-phpmyadmin: Contenedor con el cliente de phpmyadmin
- Arpegio-app: Contenedor con nodejs ejecutando la aplicacion

Obtendra una salida como la siguiente:
```bash
docker compose -f docker-compose.dev.yaml up -d
[+] Building 0.0s (0/0)
[+] Running 4/4
 ✔ Network grupo_01_arpeggio_music_default  Created 
 ✔ Container Arpegio-db                     Started 
 ✔ Container Arpegio-phpmyadmin             Started 
 ✔ Container Arpegio-app                    Started
```

Para visualizar los logs de nodemon en una terminal ejecutar:

```bash
docker logs -f Arpegio-app
```

Veremos la siguiente salida por pantalla:

```bash
docker logs -f Arpegio-app

> grupo_01_arpeggio_music@1.0.0 dev
> nodemon app.js

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
Servidor corriendo en el puerto 3000
```

Si verificamos los logs hacia arriba podemos observar que se ejecutaron las migraciones y seeders sobre la base de datos
Ejemplo:


```bash
grupo_01_arpeggio_music git:(sprint6) ✗ docker logs -f Arpegio-app

Sequelize CLI [Node: 20.5.0, CLI: 6.6.1, ORM: 6.32.1]

Loaded configuration file "database/config/config.js".
Using environment "development".
== 20230720160506-create_roles_table: migrating =======
== 20230720160506-create_roles_table: migrated (0.025s)

== 20230720160840-create_provinces_table: migrating =======
== 20230720160840-create_provinces_table: migrated (0.019s)

== 20230720160844-create_towns_table: migrating =======
== 20230720160844-create_towns_table: migrated (0.022s)

== 20230720161132-create_users_table: migrating =======
== 20230720161132-create_users_table: migrated (0.026s)

== 20230721163200-create_categories_table: migrating =======
== 20230721163200-create_categories_table: migrated (0.018s)

== 20230721163227-create_products_table: migrating =======
== 20230721163227-create_products_table: migrated (0.020s)

== 20230721165146-create_colors_table: migrating =======
== 20230721165146-create_colors_table: migrated (0.018s)

== 20230721165908-create_product-color_table: migrating =======
== 20230721165908-create_product-color_table: migrated (0.045s)

== 20230721175011-create_delivery_table: migrating =======
== 20230721175011-create_delivery_table: migrated (0.019s)

== 20230721175015-create_orders_table: migrating =======
== 20230721175015-create_orders_table: migrated (0.022s)

== 20230721175558-create_sales_table: migrating =======
== 20230721175558-create_sales_table: migrated (0.024s)

== 20230721180034-create_shippings_table: migrating =======
== 20230721180034-create_shippings_table: migrated (0.020s)

== 20230721180451-create_invoices_table: migrating =======
== 20230721180451-create_invoices_table: migrated (0.032s)

== 20230724115306-create_appconfig_table: migrating =======
== 20230724115306-create_appconfig_table: migrated (0.018s)


Sequelize CLI [Node: 20.5.0, CLI: 6.6.1, ORM: 6.32.1]

Loaded configuration file "database/config/config.js".
Using environment "development".
== 20230723191139-add-provinces: migrating =======
== 20230723191139-add-provinces: migrated (0.009s)

== 20230723193123-add-roles: migrating =======
== 20230723193123-add-roles: migrated (0.002s)

== 20230723214449-add-towns: migrating =======
== 20230723214449-add-towns: migrated (0.100s)

== 20230723222045-add-users: migrating =======
== 20230723222045-add-users: migrated (0.004s)

== 20230723223000-add-categories: migrating =======
== 20230723223000-add-categories: migrated (0.003s)

== 20230723223006-add-product: migrating =======
== 20230723223006-add-product: migrated (0.003s)

== 20230725235916-add-deliveries: migrating =======
== 20230725235916-add-deliveries: migrated (0.002s)


> grupo_01_arpeggio_music@1.0.0 dev
> nodemon -L app.js

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
Servidor corriendo en el puerto 3000

```

**5- La aplicacion ya se encuentra corriendo y podemos acceder de la siguiente manera:**

Si se dejaron las variables de entorno asignadas como en el archivo de ejemplo se podra visualizar la aplicacion en:

[`http://localhost:3000/`](http://localhost:3000/)
- Usuario administrador: pepegrillo
- Contraseña: 123

Se podrá visualizar PHPMyAdmin en:

[`http://localhost:8080/`](http://localhost:8080/)

- Servidor: Arpegio-db (nombre del contenedor de la base de datos).
- Usuario: root
- Contraseña: password

**Ejecutar entorno de producción:**

El entorno de produccion estara disponible para proximos sprints.
