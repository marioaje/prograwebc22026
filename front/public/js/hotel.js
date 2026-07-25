//Declarion de variables y librerias
// Convirtamos todo lo que se pueda jquery
import { API } from '../js/config.js';
import { hotelModels } from '../js/models/hotelModel.js';

// document.addEventListener('DOMContentLoaded', () => {
//     consultarHoteles();

//     document.getElementById('formularioEditar').addEventListener('submit', (evento) => {
//         evento.preventDefault();
//         actualizarHotel();
//     })


//     document.getElementById('formularioCrear').addEventListener('submit', (evento) => {
//         evento.preventDefault();
//         crearHotel();

//     })

//     document.getElementById('formularioEliminar').addEventListener('submit', (evento) => {
//         evento.preventDefault();
//         confirmarEliminar();
//     });

// });

$(document).ready(function () {
    consultarHoteles();

    $("#formularioEditar").submit(function (e) {
        e.preventDefault();
        actualizarHotel();
    });

    $("#formularioCrear").submit(function (e) {
        e.preventDefault();
        crearHotel();
    });


    $("#formularioEliminar").submit(function (e) {
        e.preventDefault();
        confirmarEliminar();
    });
});



function consultarHoteles() {
    // alert("cargando datos" + API.HOTEL);

    // fetch(API.HOTEL, { method: 'GET' })
    //     .then(response => response.json())
    //     .then(data => pintarTabla(data.data))
    //     .catch(error => console.error(error));

    $.ajax({
        type: "GET",
        url: API.HOTEL,
        dataType: "json",
        success: function (response) {
            pintarTabla(response.data);
            seccionSpinnerLimpiar();
        },
        beforeSend: function () {
            // alert("Cargando datos");
            seccionSpinnerCargar();
        },
        error: function (error) {
            console.error(error);
        }
    });
}


function pintarTabla(dataLista) {
    // const baseTabla = document.getElementById('baseTabla');
    // baseTabla.innerHTML = '';

    let baseTabla = $("#baseTabla");
    baseTabla.empty();


    // dataLista.forEach(elementoIndividual => {

    //     let fila = `
    //       <tr class="table-primary">
    //               <td>             
    //                  <a name="" id="" class="btn btn-warning" role="button" onclick="cargarDatosFormulario(${elementoIndividual.id})">Editar</a>
    //                  <a name="" id="" class="btn btn-danger" role="button" onclick="cargarDatosEliminar(${elementoIndividual.id})">Eliminar</a>
    //               </td>
    //               <td scope="row">${elementoIndividual.id}</td>
    //               <td>${elementoIndividual.nombre}</td>
    //               <td>${elementoIndividual.descripcion}</td>
    //               <td>${elementoIndividual.telefono}</td>
    //               <td>${elementoIndividual.correo}</td>
    //               <td>${elementoIndividual.sitio_web}</td>
    //               <td>${elementoIndividual.usuario}</td>
    //               <td>${elementoIndividual.fecha_creacion}</td>
    //               <td>${elementoIndividual.estado}</td>
    //             </tr>
    //     `;

    //     baseTabla.innerHTML += fila;

    // });

    $.each(dataLista, function (indexInArray, elementoIndividual) {
        baseTabla.append(`
          <tr class="table-primary">
                  <td>             
                     <a name="" id="" class="btn btn-warning" role="button" onclick="cargarDatosFormulario(${elementoIndividual.id})">Editar</a>
                     <a name="" id="" class="btn btn-danger" role="button" onclick="cargarDatosEliminar(${elementoIndividual.id})">Eliminar</a>
                  </td>
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
        `);
    });

}

window.cargarDatosFormulario = function (id) {
    // alert("cargando datos en el formulario" + id);

    //Cargar los datos del hotel en el formulario
    //GET https://paginas-web-cr.com/Api/hotelApi/hotel/hotel.php?id=1 
    // fetch(`${API.HOTEL}?id=${id}`, { method: 'GET' })
    //     .then(response => response.json())
    //     .then(data => formularioPintar(data.data[0]))
    //     .catch(error => console.error(error));

    $.ajax({
        type: "GET",
        url: API.HOTEL + "?id=" + id,
        dataType: "json",
        success: function (response) {
            formularioPintar(response.data[0]);
            seccionSpinnerLimpiar();
        },
        beforeSend: function () {
            //alert("Cargando datos");
            seccionSpinnerCargar();
        },
        error: function (error) {
            console.error(error);
        }
    });

}

function formularioPintar(data) {

    // document.getElementById('id').value = data.id;
    // document.getElementById('nombre').value = data.nombre;
    // document.getElementById('descripcion').value = data.descripcion;
    // document.getElementById('telefono').value = data.telefono;
    // document.getElementById('correo').value = data.correo;
    // document.getElementById('sitio_web').value = data.sitio_web;
    // // document.getElementById('usuario').value = data.usuario;
    // // document.getElementById('fecha_creacion').value = data.fecha_creacion;
    // document.getElementById('estado').value = data.estado;
    $('#id').val(data.id);
    $('#nombre').val(data.nombre);
    $('#descripcion').val(data.descripcion);
    $('#telefono').val(data.telefono);
    $('#correo').val(data.correo);
    $('#sitio_web').val(data.sitio_web);
    // $('#usuario').val(data.usuario);
    // $('#fecha_creacion').val(data.fecha_creacion);
    $('#estado').val(data.estado);

    //const modalHotel = new bootstrap.Modal(document.getElementById('modalHotel'));
    const modalHotel = new bootstrap.Modal($("#modalHotel")[0]);
    modalHotel.show();
}


function crearHotel() {
    // { "nombre":"Hotel Paradise", "descripcion":"Hotel 5 estrellas", "telefono":"2222-2222", "correo":"hotel@gmail.com", "sitio_web":"https://hotel.com", "usuario":"Mario" } 

    // const nombre = document.getElementById('nombreCrear').value;
    // const descripcion = document.getElementById('descripcionCrear').value;
    // const telefono = document.getElementById('telefonoCrear').value;
    // const correo = document.getElementById('correoCrear').value;
    // const sitio_web = document.getElementById('sitio_webCrear').value;

    const nombre = $('#nombreCrear').val();
    const descripcion = $('#descripcionCrear').val();
    const telefono = $('#telefonoCrear').val();
    const correo = $('#correoCrear').val();
    const sitio_web = $('#sitio_webCrear').val();
    const usuario = "Profe Mario";

    const objetoHotel = new hotelModels(0, nombre, descripcion, telefono, correo, sitio_web, usuario);


    // fetch(API.HOTEL, { method: 'POST', body: JSON.stringify(objetoHotel) })
    //     .then(response => response.json())
    //     .then(data => finalzarCrear(data.data))
    //     .catch(error => console.error(error));


    $.ajax({
        type: "POST",
        url: API.HOTEL,
        dataType: "json",
        data: JSON.stringify(objetoHotel),
        success: function (response) {
            finalzarCrear(response.data);
            seccionSpinnerLimpiar();
        },
        beforeSend: function () {
            //alert("Almacenando");
            seccionSpinnerCargar();
        },
        error: function (error) {
            console.error(error);
        }
    });


}



function finalzarCrear(data) {
    alert("Hotel creado con exito");
    consultarHoteles();
    //document.getElementById('formularioCrear').reset();
    $("#formularioCrear")[0].reset();

    //const modalCrear = bootstrap.Modal.getInstance(document.getElementById('modalCrear'));
    //modalCrear.hide();
    bootstrap.Modal.getInstance($("#modalCrear")[0]).hide();

}


function actualizarHotel() {
    // const id = document.getElementById('id').value;
    // const nombre = document.getElementById('nombre').value;
    // const descripcion = document.getElementById('descripcion').value;
    // const telefono = document.getElementById('telefono').value;
    // const correo = document.getElementById('correo').value;
    // const sitio_web = document.getElementById('sitio_web').value;

    const id = $('#id').val();
    const nombre = $('#nombre').val();
    const descripcion = $('#descripcion').val();
    const telefono = $('#telefono').val();
    const correo = $('#correo').val();
    const sitio_web = $('#sitio_web').val();
    const usuario = "Profe Mario";

    // { "id":1, "nombre":"Hotel Paradise CR", "descripcion":"Actualizado", "telefono":"8888-9999", "correo":"nuevo@gmail.com", "sitio_web":"https://hotelcr.com", "usuario":"Mario" } 

    const objetoHotel = new hotelModels(id, nombre, descripcion, telefono, correo, sitio_web, usuario);


    // fetch(API.HOTEL, { method: 'PUT', body: JSON.stringify(objetoHotel) })
    //     .then(response => response.json())
    //     .then(data => finalzarEditar(data.data))
    //     .catch(error => console.error(error));


    $.ajax({
        type: "PUT",
        url: API.HOTEL,
        dataType: "json",
        data: JSON.stringify(objetoHotel),
        success: function (response) {
            finalzarEditar(response.data);
            seccionSpinnerLimpiar();
        },
        beforeSend: function () {
            //alert("Actualizando");
            seccionSpinnerCargar();
        },
        error: function (error) {
            console.error(error);
        }
    });
}


function finalzarEditar(data) {
    alert("Hotel editado con exito");
    consultarHoteles();
    //document.getElementById('formularioEditar').reset();
    $("#formularioEditar")[0].reset();

    // const modalHotel = bootstrap.Modal.getInstance(document.getElementById('modalHotel'));
    // modalHotel.hide();

    bootstrap.Modal.getInstance($("#modalHotel")[0]).hide();
}


function eliminarHotel(id) {

    const objetoHotel = new hotelModels(id, "", "", "", "", "", "");


    // fetch(API.HOTEL, { method: 'DELETE', body: JSON.stringify(objetoHotel) })
    //     .then(response => response.json())
    //     .then(data => finalzarEliminar(data.data))
    //     .catch(error => console.error(error));


    $.ajax({
        type: "DELETE",
        url: API.HOTEL,
        dataType: "json",
        data: JSON.stringify(objetoHotel),
        success: function (response) {
            finalzarEliminar(response.data);
            seccionSpinnerLimpiar();
        },
        beforeSend: function () {
            //alert("Eliminando");
            seccionSpinnerCargar();
        },
        error: function (error) {
            console.error(error);
        }
    });

}

function finalzarEliminar(data) {
    alert("Hotel eliminado con exito");
    consultarHoteles();
}



window.cargarDatosEliminar = function (id) {

    // document.getElementById('idEliminar').textContent = id;
    $('#idEliminar').text(id);
    //document.getElementById('idEliminarInput').value = id;
    $('#idEliminarInput').val(id);
    //const modalEliminar = new bootstrap.Modal(document.getElementById('modalEliminar'));
    const modalEliminar = new bootstrap.Modal($("#modalEliminar")[0]);
    modalEliminar.show();

}

function confirmarEliminar() {
    //const id = document.getElementById('idEliminarInput').value;
    const id = $('#idEliminarInput').val();
    eliminarHotel(id);
    //const modalEliminar = bootstrap.Modal.getInstance(document.getElementById('modalEliminar'));
    //modalEliminar.hide();
    bootstrap.Modal.getInstance($("#modalEliminar")[0]).hide();
    $(window).scrollTop(0);
}


function seccionSpinnerCargar() {
    // const seccionSpinner = document.getElementById('seccionSpinner');
    const seccionSpinner = $("#seccionSpinner");
    seccionSpinner.empty();

    seccionSpinner.append(`
                <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-border text-secondary" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-border text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-border text-info" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-border text-dark" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
    `)

}


function seccionSpinnerLimpiar() {
    // const seccionSpinner = document.getElementById('seccionSpinner');
    const seccionSpinner = $("#seccionSpinner");
    seccionSpinner.empty();

}