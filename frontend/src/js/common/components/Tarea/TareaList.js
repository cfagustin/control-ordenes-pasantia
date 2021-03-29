// Importar el modulo de react
import React, {Component, Fragment} from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
// Importar Grid
import Grid from '../Utils/Grid';
// Importamos el standardActions
import {standardActions} from '../Utils/Grid/StandardActions';
import Swal from 'sweetalert2';


/**
 * COMPONENTE ListadoTarea
 */
class ListadoTarea extends Component{

    eliminar = (id, id_asignacion) => {
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
                    this.props.eliminarTarea(id, id_asignacion);
                }
            });
        }
    };


    // Funcion que se ejecuta antes de renderizar el contenido (Formulario)
    componentWillMount = () =>{
        // Obtener la funcion ListarTareaPorCurso
        const {listarTareaPorCurso, match} =this.props;
        // Obtenemo el idAsignacion
        const id = match.params.id;

        // Llamamos a la funcion pasandole como parametro el idAsignacion
        listarTareaPorCurso(id);
    }


    render(){
        // Obtenemos de los (data, loader) props
        const {data, loader, match} = this.props;
        // Obtenemos el idAsignacion
        const idAsignacion = match.params.id;
        //
        const url = `/#/tarea/${idAsignacion}/registro`

        return(
            <Fragment>
                <center>
                    <h2>Tareas Compartidas</h2>
                </center>

                <div className="row">
                    <div className="col-lg-10">
                        <div className="d-flex flex-row justify-content-start mb-3">
                            <a href={url} className="btn btn-primary">Registrar Tarea</a>
                        </div>
                    </div>

                    <div className="col-lg-2">
                        <div className="d-flex flex-row justify-content-end mb-3">
                            <a href="/#/asignacionestudiante" className="btn btn-secondary">Regresar</a>
                        </div>
                    </div>
                </div>
                
                <Grid
                hover 
                striped 
                data={data} 
                loading={loader} 
                >

                    <TableHeaderColumn
                    dataField='tarea'
                    dataSort
                    dataFormat={(cell, row)=>{
                        return row.titulo_tarea
                    }}
                    >
                        Titulo Tarea
                    </TableHeaderColumn>

                    <TableHeaderColumn
                    dataField='tarea'
                    dataSort
                    dataFormat={(cell, row)=>{
                        return row.fecha_entrega
                    }}
                    >
                        Fecha Entrega
                    </TableHeaderColumn>

                    <TableHeaderColumn
                    dataField='tarea'
                    dataSort
                    dataFormat={(cell, row)=>{
                        return row.hora_entrega
                    }}
                    >
                        Hora Entrega
                    </TableHeaderColumn>

                    <TableHeaderColumn
                    dataField='tarea'
                    dataSort
                    dataFormat={(cell, row)=>{
                        return row.nota
                    }}
                    >
                        Nota
                    </TableHeaderColumn>

                    <TableHeaderColumn
                        isKey
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={(cell, row)=>{
                            //console.log("row todo: ",row)
                            return(
                                <div className="d-flex justify-content-center">
                                    <a href={`/#/tarea/${row.id}/ver/${idAsignacion}/asignacion`} className="px-2"><i className="material-icons">remove_red_eye</i></a>
                                    <a href={`/#/tarea/${row.id}/editar/${idAsignacion}/asignacion`} className="text-warning" ><i className="material-icons">edit</i></a>
                                    <a onClick={this.eliminar(row.id, idAsignacion)} className="px-2" style={{cursor: "pointer", color: "#c4183c"}} ><i className="material-icons">delete</i></a>
                                    <a href={`/#/tarea/${row.id}/listado-tareas/${idAsignacion}`} style={{cursor: "pointer", color: "#28B463"}} className="px-2"><i className="material-icons">remove_red_eye</i></a>
                                </div>
                                //calificar_tarea: "tarea",
                            )
                        }}
                    >
                    Acciones
                    </TableHeaderColumn>
                </Grid>
            </Fragment>
        );
    }
}
export default ListadoTarea;
