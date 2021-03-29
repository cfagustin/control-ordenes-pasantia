import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './acciones.css';
import Swal from 'sweetalert2';


class Acciones extends Component {
    constructor(props) {
        super(props);
    }

    eliminar = (id) => {
        return () => {
            Swal.fire({
                title: '¿Eliminar?',
                text: '¡No podrá revertir esta acción!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: '¡Sí, eliminar!',
                cancelButtonText: 'No, cancelar',
                reverseButtons: true
            }).then((result) => {
                if (result.value) {
                    this.props.eliminar(id);
                }
            });
        }
    };

    render() {
        const { id, ver, editar, eliminar, asignar, subir_doc, subir_tarea, calificar_tarea } = this.props;

        return (

            <div className="d-flex justify-content-center">
                {(ver !== undefined) && (
                    <Link to={`${ver}/${id}/`} className="px-2" ><i className="material-icons">remove_red_eye</i></Link>
                )}
                {(editar !== undefined) && (
                    <Link className="text-warning" to={`${editar}/${id}/editar`} ><i className="material-icons">edit</i></Link>
                )}
                {(eliminar !== undefined) && (
                    <a className="px-2" style={{cursor: "pointer", color: "#c4183c"}} onClick={this.eliminar(id)}><i className="material-icons">delete</i></a>
                )}
                {(asignar !== undefined) && (
                    <Link className="px-2"  to={`${asignar}/${id}/asignar`} ><i className="material-icons">person_add</i></Link>
                )}
                {(subir_doc !== undefined) && (
                    <Link className="px-2" style={{cursor: "pointer", color: "#34495E"}} to={`${subir_doc}/${id}/listar`} ><i className="material-icons">upload_file</i></Link>
                )}
                {(subir_tarea !== undefined) && (
                    <Link className="px-2" style={{cursor: "pointer", color: "#28B463"}} to={`${subir_tarea}/${id}/listar`} ><i className="material-icons">file_upload</i></Link>
                )}
                {(calificar_tarea !== undefined) && (
                    <Link className="px-2" style={{cursor: "pointer", color: "#28B463"}} to={`${calificar_tarea}/${id}/listado-tareas`} ><i className="material-icons">remove_red_eye</i></Link>
                )}
            </div>
        );
    }
}
Acciones.propTypes = {
};

export function standardActions(acciones) {
    return (cell, row) => {
        return ( <Acciones id={cell} {...acciones}/> )
    };
}
