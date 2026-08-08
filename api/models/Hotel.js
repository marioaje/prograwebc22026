const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    sitio_web: {
        type: String,
        required: true
    },
    usuario: {
        type: String,
        required: true
    },
    fecha_creacion: {
        type: Date,
        required: true
    },
    estado: {
        type: String,
        required: true
    }
});

//const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = mongoose.model("Hotel", hotelSchema);

