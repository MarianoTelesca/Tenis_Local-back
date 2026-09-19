const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');

const app = express();
const port = 8888;

app.use(bodyParser.urlencoded( { extended: true }));
app.use(bodyParser.json())

app.listen(port, () => {
    console.log('servidor iniciado en: http://localhost:' + port);
} );

app.get("/", (req, res) => {
    res.send("mensaje");
} );


// Prueba de la conexión a la base de datos
app.get("/tenis_local", async(req, res) => {
    const query = 'SELECT id, nombre, x FROM tabla';
    try{
        const [results] = await connection.query(query);
        res.json( {success: true, results: results} );
    }catch(error){
        res.status(500).json( {success: false, message: "error x x etc."});
    }
});

//El req es todo lo relacionado al usuario
//El res son las respuestas al usuario
app.get("/test/:nombre/", (req, res) => {
    const {nombre} = req.params;
    res.send(`mensaje, ${nombre}`)
} );

// Personalización error 404
app.use((req, res, next) => {
    res.status(404).send('estructura 404')
} );
