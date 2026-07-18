export class hotelModels {

    constructor(
        id = 0,
        nombre = "",
        descripcion = "",
        telefono = "",
        correo = "",
        sitio_web = "",
        usuario = "",
        fecha_creacion = "",
        estado = ""
    ) {
        this.id = id,
            this.nombre = nombre,
            this.descripcion = descripcion,
            this.telefono = telefono,
            this.correo = correo,
            this.sitio_web = sitio_web,
            this.usuario = usuario,
            this.fecha_creacion = fecha_creacion,
            this.estado = estado
    }


}
