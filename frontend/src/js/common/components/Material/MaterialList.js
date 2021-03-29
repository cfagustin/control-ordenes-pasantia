// Importar el modulo de react
import React, { cloneElement, Component, Fragment } from 'react';
// Importar grids
import Grid from '../Utils/Grid'
import Swal from 'sweetalert2';



/**
 * COMPONENTE 
 */
class ListadoMaterial extends Component{

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
                    this.props.eliminarMaterial(id, id_asignacion);
                }
            });
        }
    };


    // Metodo que se ejecuta antes de que react renderice su contenido 
    componentWillMount = () => {
        // Obtenemos la funcion (listar)
        const {listarMaterialesPorCurso, match} = this.props;
        // Obtenemos el id
        const id = match.params.id;
        // llamamos a la funcion
        listarMaterialesPorCurso(id)
    }

    render(){

        // Obtenemos los datos
        // Obtengo eliminar
        const { data, loader, eliminarMaterial, match} = this.props;
        console.log("mis props: ",this.props)
        // Obtenemos el id asignacion 
        const idAsignacion = match.params.id
        const url = `/#/material/${idAsignacion}/registro`; 
        

        return(
            <Fragment>
                <center>
                    <h2 className="mt-4">Materiales Compartidos</h2>
                </center>

                <div className="row">
                    <div className="col-lg-10">
                        <div className="d-flex flex-row justify-content-start mb-3">
                            <a href={url} className="btn btn-primary">Registrar Material</a>
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
                    //onPageChange={onPageChange} 
                    //onSortChange={onSortChange} 
                >
                    
                    <TableHeaderColumn 
                        dataField="material"
                        dataSort
                        dataFormat={(cell, row)=>{
                            return row.titulo_material 
                        }}
                    >
                    Titulo Material
                    </TableHeaderColumn>

                    <TableHeaderColumn 
                        dataField="material"
                        dataSort
                        dataFormat={(cell, row)=>{
                            return row.descripcion
                        }}
                    >
                    Descripción
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
                                    <a href={`/#/material/${row.id}/ver/${idAsignacion}/asignacion`} className="px-2"><i className="material-icons">remove_red_eye</i></a>
                                    <a href={`/#/material/${row.id}/editar/${idAsignacion}/asignacion`} className="text-warning" ><i className="material-icons">edit</i></a>
                                    <a onClick={this.eliminar(row.id, idAsignacion)} className="px-2" style={{cursor: "pointer", color: "#c4183c"}} ><i className="material-icons">delete</i></a>
                                </div>
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
export default ListadoMaterial;