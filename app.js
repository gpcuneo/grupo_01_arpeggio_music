const express = require('express');

const app = express();

const port = 3000;
app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`) );

app.get('/', (req, res) => res.send('Arpeggio Music - Sitio en construccion.') );