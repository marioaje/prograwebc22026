//Declarion de variables y librerias

import { API } from '../js/config.js';
import { hotelModels } from '../js/models/hotelModel.js';




document.addEventListener('DOMContentLoaded', () => {
    consultarHoteles();

    document.getElementById('formularioEditar').addEventListener('submit', (evento) => {
        evento.preventDefault();
        actualizarHotel();
    })


    document.getElementById('formularioCrear').addEventListener('submit', (evento) => {
        evento.preventDefault();
        crearHotel();

    })



});




function consultarHoteles() {
    // alert("cargando datos" + API.HOTEL);

    fetch(API.HOTEL, { method: 'GET' })
        .then(response => response.json())
        .then(data => pintarTabla(data.data))
        .catch(error => console.error(error));
}


function pintarTabla(dataLista) {
    const baseTabla = document.getElementById('baseTabla');
    baseTabla.innerHTML = '';


    dataLista.forEach(elementoIndividual => {

        let fila = `
          <tr class="table-primary">
                  <td>             
                     <a name="" id="" class="btn btn-warning" role="button" onclick="cargarDatosFormulario(${elementoIndividual.id})">Editar</a
                ></td>
                  <td scope="row">${elementoIndividual.id}</td>
                  <td>${elementoIndividual.nombre}</td>
                  <td>${elementoIndividual.descripcion}</td>
                  <td>${elementoIndividual.telefono}</td>
                  <td>${elementoIndividual.correo}</td>
                  <td>${elementoIndividual.sitio_web}</td>
                  <td>${elementoIndividual.usuario}</td>
                  <td>${elementoIndividual.fecha_creacion}</td>
                  <td>${elementoIndividual.estado}</td>
                </tr>
        `;

        baseTabla.innerHTML += fila;

    });

}

window.cargarDatosFormulario = function (id) {
    // alert("cargando datos en el formulario" + id);

    //Cargar los datos del hotel en el formulario
    //GET https://paginas-web-cr.com/Api/hotelApi/hotel/hotel.php?id=1 
    fetch(`${API.HOTEL}?id=${id}`, { method: 'GET' })
        .then(response => response.json())
        .then(data => formularioPintar(data.data[0]))
        .catch(error => console.error(error));

}

function formularioPintar(data) {

    document.getElementById('id').value = data.id;
    document.getElementById('nombre').value = data.nombre;
    document.getElementById('descripcion').value = data.descripcion;
    document.getElementById('telefono').value = data.telefono;
    document.getElementById('correo').value = data.correo;
    document.getElementById('sitio_web').value = data.sitio_web;
    // document.getElementById('usuario').value = data.usuario;
    // document.getElementById('fecha_creacion').value = data.fecha_creacion;
    document.getElementById('estado').value = data.estado;

    const modalHotel = new bootstrap.Modal(document.getElementById('modalHotel'));
    modalHotel.show();
}


function crearHotel() {
    // { "nombre":"Hotel Paradise", "descripcion":"Hotel 5 estrellas", "telefono":"2222-2222", "correo":"hotel@gmail.com", "sitio_web":"https://hotel.com", "usuario":"Mario" } 

    const nombre = document.getElementById('nombreCrear').value;
    const descripcion = document.getElementById('descripcionCrear').value;
    const telefono = document.getElementById('telefonoCrear').value;
    const correo = document.getElementById('correoCrear').value;
    const sitio_web = document.getElementById('sitio_webCrear').value;
    const usuario = "Profe Mario";

    const objetoHotel = new hotelModels(0, nombre, descripcion, telefono, correo, sitio_web, usuario);


    fetch(API.HOTEL, { method: 'POST', body: JSON.stringify(objetoHotel) })
        .then(response => response.json())
        .then(data => finalzarCrear(data.data))
        .catch(error => console.error(error));

}



function finalzarCrear(data) {
    alert("Hotel creado con exito");
    consultarHoteles();
    document.getElementById('formularioCrear').reset();

    const modalCrear = bootstrap.Modal.getInstance(document.getElementById('modalCrear'));
    modalCrear.hide();
}


function actualizarHotel() {
    const id = document.getElementById('id').value;
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;
    const sitio_web = document.getElementById('sitio_web').value;
    const usuario = "Profe Mario";

    // { "id":1, "nombre":"Hotel Paradise CR", "descripcion":"Actualizado", "telefono":"8888-9999", "correo":"nuevo@gmail.com", "sitio_web":"https://hotelcr.com", "usuario":"Mario" } 

    const objetoHotel = new hotelModels(id, nombre, descripcion, telefono, correo, sitio_web, usuario);


    fetch(API.HOTEL, { method: 'PUT', body: JSON.stringify(objetoHotel) })
        .then(response => response.json())
        .then(data => finalzarEditar(data.data))
        .catch(error => console.error(error));
}


function finalzarEditar(data) {
    alert("Hotel editado con exito");
    consultarHoteles();
    document.getElementById('formularioEditar').reset();

    const modalHotel = bootstrap.Modal.getInstance(document.getElementById('modalHotel'));
    modalHotel.hide();
}


function eliminarHotel(id) {
    fetch(`${API.HOTEL}/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            alert("Hotel eliminado con exito");
            consultarHoteles();
        })
        .catch(error => console.error(error));
}
// function cargarDatosFormulario(id) {
//     alert("cargando datos en el formulario" + id);

//     //Cargar los datos del hotel en el formulario

// }
