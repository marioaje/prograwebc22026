const mongoose = require("mongoose");

const sedeSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    id_hotel: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    pais: {
        type: String,
        required: true
    },
    provincia: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    direccion: {
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
    cantidad_habitaciones: {
        type: Number,
        required: true
    },
    usuario: {
        type: String,
        required: true
    },
    fecha_creacion: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    activo: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Sede", sedeSchema);