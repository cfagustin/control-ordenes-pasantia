import React, { cloneElement, Component, Fragment } from 'react';
import request from 'superagent';
// Importar grids
import Grid from '../Utils/Grid'
import {standardActions} from "../Utils/Grid/StandardActions";


/**
 * COMPONENTE 
 */
class ListadoAsignacionEstudiante extends Component{

    // Metodo que se ejecuta antes de que react renderice su contenido 
    componentWillMount = () => {
        // Obtenemos la funcion (listar)
        const {listarCursosAsignados} = this.props;
        // llamamos a la funcion
        listarCursosAsignados();
    }

    render(){

        // Obtenemos los datos
        // Obtengo eliminar
        const { data, loader} = this.props;
        return(
            <Fragment>
                <center>
                    <h2 className="mt-4">Cursos Asignados</h2>
                </center>
                
                <Grid 
                    hover 
                    striped 
                    data={data} 
                    loading={loader} 
                    //onPageChange={onPageChange} 
                    //onSortChange={onSortChange} 
                >

                    <TableHeaderColumn 
                        dataField="ciclo"
                        dataSort
                        dataFormat={(cell, row)=>{
                            if (cell && cell.ciclo_escolar){
                                return cell.ciclo_escolar;
                            }
                        }}
                    >
                    Ciclo Escolar
                    </TableHeaderColumn>

                    <TableHeaderColumn 
                        dataField="grado"
                        dataSort
                        dataFormat={(cell, row)=>{
                            if (cell && cell.nombre_grado){
                                return cell.nombre_grado;
                            }
                        }}
                    >
                    Grado
                    </TableHeaderColumn>

                    <TableHeaderColumn 
                        dataField="seccion"
                        dataSort
                        dataFormat={(cell, row)=>{
                            if (cell && cell.nombre_seccion){
                                return cell.nombre_seccion;
                            }
                        }}
                    >
                    Sección
                    </TableHeaderColumn>

                    <TableHeaderColumn 
                        dataField="curso"
                        dataSort
                        dataFormat={(cell, row)=>{
                            if (cell && cell.nombre_curso){
                                return cell.nombre_curso;
                            }
                        }}
                    >
                    Curso
                    </TableHeaderColumn>

                    <TableHeaderColumn
                        isKey
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({ 
                            asignar: "asignacionestudiante",
                            subir_doc: "material",
                            subir_tarea: "tarea",
                        })}
                    >
                    Acciones
                    </TableHeaderColumn>
                </Grid>                
            </Fragment>
        );
    }
}
export default ListadoAsignacionEstudiante;