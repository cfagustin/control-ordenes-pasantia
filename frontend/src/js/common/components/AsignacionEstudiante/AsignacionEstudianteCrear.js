import React, { Component, Fragment } from 'react';
// Importar componente Formulario
import Formulario from './Formulario';
import Grid from '../Utils/Grid'
import {standardActions} from "../Utils/Grid/StandardActions";
import { TableHeaderColumn } from 'react-bootstrap-table';




/**
 * COMPONENTE
 */
class AsignacionEstudiante extends Component{

    // Estado inicial de mi componente
    state={
        // Bandera para saber que accion estamos realizando
        creacion: true,
    }

    // Metodo que se ejecuta antes de que react renderice su contenido 
    componentWillMount = () => {
         // Obtenemos listarEstudiantesAsignados
        const {listarEstudiantesAsignados, match} = this.props;
        const id = match.params.id
        // llamamos la funcion 
        listarEstudiantesAsignados(id);
    }       
    


    // Se ejecuta este metodo al momento de dar clic en (Asignar) 
    obtenerIdAsignar = (data) => {
        // Obtener la funcion registrarAsignacion
        const { registrarAsignacionEstudiante, match } = this.props;
        // Obtener el id
        const id = match.params.id;
        // llamamos a la funcion editarCatedratico 
        registrarAsignacionEstudiante(id, data);
    }

    render(){
        // Visualizar los datos del props
        console.log("PROPS1: ", this.props);
        const {data, loader} = this.props;
        // Obtener la funcion crearAsignacion, data, loader
        //const { registrarAsignacionEstudiante, data, loader } = this.props;
        // Obtener el esta inicial
        const { creacion} = this.state;
        // Con un metodo ternario validamos 
        // Si creacion == true entonces llamamos a la funcion (crearAsignacion)
        // En caso contrario llamamos a la funcion de (obtenerIdAsignacion)
        const funcionEnvio = this.obtenerIdAsignar
     
        return(
            <Fragment>
                <Formulario 
                    // Pasamos el estado incial al componente Formulario
                    creacion={creacion}
                    // Enviamos la constante al componente Formulario
                    onSubmit={funcionEnvio}
                    //
                    data={data}
                    loader={loader}
                />     

                <center>
                    <h2 className="mt-4">Estudiantes Asignados</h2>
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
                        dataField="estudiante"
                        dataSort
                        dataFormat={(cell, row)=>{
                            if(cell && cell.profile ){
                                return cell.profile.nombre 
                            }
                        }}
                    >
                    Estudiante
                    </TableHeaderColumn>

                    <TableHeaderColumn 
                        dataField="asignacion"
                        dataSort
                        dataFormat={(cell, row)=>{
                            if (cell && cell.grado){
                                return cell.grado.nombre_grado;
                            }
                        }}
                    >
                    Grado
                    </TableHeaderColumn>

                    <TableHeaderColumn 
                        dataField="asignacion"
                        dataSort
                        dataFormat={(cell, row)=>{
                            if (cell && cell.seccion){
                                return cell.seccion.nombre_seccion;
                            }
                        }}
                    >
                    Sección
                    </TableHeaderColumn>

                    <TableHeaderColumn 
                        dataField="asignacion"
                        dataSort
                        dataFormat={(cell, row)=>{
                            if (cell && cell.seccion){
                                return cell.curso.nombre_curso;
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
                            eliminar: "asignacionestudiante",
                        })}
                    >
                    Acciones
                    </TableHeaderColumn>
                </Grid>
            </Fragment>
        );
    }
}
export default AsignacionEstudiante;