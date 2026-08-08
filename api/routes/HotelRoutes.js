const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');

// Obtener todos los hoteles
//GET https://paginas-web-cr.com/Api/hotelApi/sede/sede.php 
router.get('/', async (req, res) => {
    try {
        const hoteles = await Hotel.find();
        //res.json(hoteles);
        res.status(200).json(
            {
                code: 200,
                message: "Consulta realizada correctamente",
                data: hoteles
            });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//GET https://paginas-web-cr.com/Api/hotelApi/hotel/hotel.php?id=1 

//por id
router.get('/:id', async (req, res) => {
    try {
        const hoteles = await Hotel.findById(req.params.id);
        //res.json(hoteles);
        res.status(200).json(
            {
                code: 200,
                message: "Consulta realizada correctamente",
                data: hoteles
            });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//Insertar datos o post
router.post('/', async (req, res) => {
    try {
        //  const nombre = $('#nombreCrear').val();
        //     const descripcion = $('#descripcionCrear').val();
        //     const telefono = $('#telefonoCrear').val();
        //     const correo = $('#correoCrear').val();
        //     const sitio_web = $('#sitio_webCrear').val();
        //     const usuario = "Profe Mario";

        //     const objetoHotel = new hotelModels(0, nombre, descripcion, telefono, correo, sitio_web, usuario);

        const hotel = new Hotel(req.body);
        hotel.fecha_creacion = new Date();
        const savedHotel = await hotel.save();
        res.status(201).json(savedHotel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;