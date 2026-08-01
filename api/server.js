require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Conexión a la base de datos establecida");
    })
    .catch((error) => {
        console.error("Error al conectar a la base de datos:", error);
    });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

