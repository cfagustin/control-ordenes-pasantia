// Importar el modulo react
import React, {Component, Fragment} from 'react';
// Importar react-bootstrap-table
import {TableHeaderColumn} from 'react-bootstrap-table';
import { listarCursosAsignados, listarTareasEnviadas } from '../../../redux/modules/tareaestudiante/tareaestudiante';
// Importar Grid
import Grid from '../Utils/Grid';
// Importar standardActions
import {standardActions} from '../Utils/Grid/StandardActions';



/**
 * CREAR COMPONENTE ListadoTareaEstudiante
 */
class ListadoTareaEstudiante extends Component{

    // Funcion que se ejecutar antes de renderizar el componente
    componentWillMount = () =>{
        // Obtener la funcion propia ListarCursosAsignados
        const {listarTareasPorMisCursos, match} = this.props;
        // Obtener el idAsignacion
        const idAsignacion = match.params.id;
        // Llamar la funcion propia 
        listarTareasPorMisCursos(idAsignacion);
        
    }



    render(){
        // Obtenemos data y loader
        const {data, loader, match} = this.props;
        const idAsignacion = match.params.id;
        
        console.log("P2: ", this.props)
       
        return(
            <Fragment>
                <center>
                    <h2>Tareas a Entregar</h2>
                    
                </center>

                <div className="row">
                    <div className="col-lg-10">
                        <div className="d-flex flex-row justify-content-start mb-3">
                            <a href="/#/tareaestudiante" className="btn btn-secondary">Regresar</a>
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
                                    <a href={`/#/tareaestudiante/${row.id}/registro/${idAsignacion}`} className="text-success" ><i className="material-icons">file_upload</i></a>
                                    <a href={`/#/tareaestudiante/${row.id}/ver-calificacion/${idAsignacion}`} style={{cursor: "pointer", color: "#34495E"}} ><i className="material-icons">remove_red_eye</i></a>
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
export default ListadoTareaEstudiante;