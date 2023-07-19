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

# **Ejecutar proyecto en contenedores Docker**

**Clone el proyecto:**

```bash
git clone git@github.com:gpcuneo/grupo_01_arpeggio_music.git
```

**Configurar variables de entorno:**

Renombre el archivo .env.template por .env y modifique las variables de entorno segun sus necesidades

```bash
# Modifique el archivo en base a su entorno
APP_NAME=Arpegio                # Nombre de la aplicacion
APP_VERSION=1.0                 # Version de la aplicacion
APP_SESSION_SECRET=Reemplazar   # Secreto de la aplicacion
APP_PORT=3000                   # Puerto de la aplicacion
DB_HOST=db                      # Nombre de host del servidor de base de datos
DB_PORT=3306                    # Puerto del servidor de base de datos
DB_DIALECT=mysql                # Motor de base de datos
DB_DATABASE=database            # Nombre de la base de datos
DB_USER=appuser                 # Usuario de coneccion de la base de datos
DB_PASSWORD=apppass             # Password de coneccion del usuario de la base de datos
DB_ROOT_PASSWORD=password       # Password de mysql root
PMA_WEB_PORT=8080               # Puerto para conectarse al PHPMyAdmin
PMA_ARBITRARY=1                 # PMA para PHPMyAdmin
```

**Build de la imagen de la aplicacion:**

```bash
docker build --target dev -t arpegio:1.0 .
```

**Ejecutar entorno de desarrollo (nodemon):**

```bash
docker compose -f docker-compose.dev.yaml up -d
[+] Building 0.0s (0/0)
[+] Running 4/4
 ✔ Network grupo_01_arpeggio_music_default  Created 
 ✔ Container Arpegio-db                     Started 
 ✔ Container Arpegio-phpmyadmin             Started 
 ✔ Container Arpegio-app                    Started
```

Se crearan 3 contenedores:

- Aplicación NodeJS
- Base de datos MySQL
- PHPMyAdmin

Para visualizar los logs de nodemon en una terminal ejecutar:

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

Se podra visualizar la aplicacion en:

[`http://localhost:3000/`](http://localhost:3000/)

Se podrá visualizar PHPMyAdmin en:

[`http://localhost:8080/`](http://localhost:8080/)

**Ejecutar entorno de producción:**

```bash
docker compose -f docker-compose.yaml up -d
```
