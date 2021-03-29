// Importar el modulo react
import React, {Component, Fragment} from 'react';
// Importar react-bootstrap-table
import {TableHeaderColumn} from 'react-bootstrap-table';
// Importar Grid
import Grid from '../Utils/Grid';
// Importar standardActions
import {standardActions} from '../Utils/Grid/StandardActions';
// Importar sweetalert2
import Swal from 'sweetalert2';
import TareaEstudianteList from './TareaEstudianteList';


/**
 * CREAR COMPONENTE ListadoTareaEstudiante
 */
class ListadoCursosAsignados extends Component{

    // Funcion que se ejecutar antes de renderizar el componente
    componentWillMount = () =>{
        // Obtener la funcion propia ListarCursosAsignados
        const {listarCursosAsignados} = this.props;
        // Llamar la funcion propia 
        listarCursosAsignados();
    }



    render(){
        // Obtenemos data y loader
        const {data, loader} = this.props;
        console.log("P5: ", this.props)
        
        return(
            <Fragment>
                <center>
                    <h2>Mis Cursos</h2>
                </center>

                <Grid
                hover 
                striped 
                data={data} 
                loading={loader} 
                >

                    <TableHeaderColumn
                    dataField='asignacionestudiante'
                    dataSort
                    dataFormat={(cell, row)=>{
                        return row.asignacion.curso.nombre_curso
                    }}
                    >
                    Curso
                    </TableHeaderColumn>

                    <TableHeaderColumn
                    dataField='asignacionestudiante'
                    dataSort
                    dataFormat={(cell, row)=>{
                        return row.asignacion.grado.nombre_grado
                    }}
                    >
                    Grado
                    </TableHeaderColumn>

                    <TableHeaderColumn
                    dataField='asignacionestudiante'
                    dataSort
                    dataFormat={(cell, row)=>{
                        return row.asignacion.seccion.nombre_seccion
                    }}
                    >
                    Sección
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
                                    <a href={`/#/tareaestudiante/${row.asignacion.id}/listar`} className="text-success" ><i className="material-icons">remove_red_eye</i></a>
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
export default ListadoCursosAsignados;