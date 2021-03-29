// Importar el modulo react
import React, {Component, Fragment} from 'react';
// Importar react-bootstrap-table
import {TableHeaderColumn} from 'react-bootstrap-table';
// Importar Grid
import Grid from '../Utils/Grid';
// Importar standardActions
import {standardActions} from '../Utils/Grid/StandardActions';



/**
 * CREAR COMPONENTE ListadoTareaEstudiante
 */
class ListadoTareaPorCalificar extends Component{

    // Funcion que se ejecutar antes de renderizar el componente
    
    componentWillMount = () =>{
        // Obtener la funcion propia ListarCursosAsignados
        const {listarTareasPorCalificar, match} = this.props;
        // Obtener el idAsignacion
        const idTarea = match.params.id;
        // Llamar la funcion propia 
        listarTareasPorCalificar(idTarea);
    }
    


    render(){
        // Obtenemos data y loader
        const {data, loader, match} = this.props;
        console.log("mis datos: ", this.props)
        const idAsignacion = match.params.ids
        const idTarea = match.params.id;
        const url = `/#/tarea/${idAsignacion}/listar`;

        return(
            <Fragment>
                <center>
                    <h2>Tareas Entregadas</h2>
                </center>

                <div className="row">
                    <div className="col-lg-10">
                        <div className="d-flex flex-row justify-content-start mb-3">
                            <a href={url} className="btn btn-secondary">Regresar</a>
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
                    dataField='tareaestudiante'
                    dataSort
                    dataFormat={(cell, row)=>{
                        return row.fecha_entrega
                    }}
                    >
                    Fecha Entrega
                    </TableHeaderColumn>

                    <TableHeaderColumn
                    dataField='tareaestudiante'
                    dataSort
                    dataFormat={(cell, row)=>{
                        return row.descripcion
                    }}
                    >
                    Descripción
                    </TableHeaderColumn>
                   
                    <TableHeaderColumn
                    dataField='tareaestudiante'
                    dataSort
                    dataFormat={(cell, row)=>{
                        if(row.calificacion == 0){
                            return <span style={{ background: '#E74C3C', color:'black'}}>{row.calificacion}</span>
                        }else{
                            return <span style={{ background: 'rgb(40, 180, 99)', color:'black'}}>{row.calificacion}</span>
                        }
                        
                    }}
                    >
                    Tarea Calificada
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
                                    <a href={`/#/tareaestudiante/${row.id}/calificar/${idAsignacion}`} ><i className="material-icons">done</i></a>
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
export default ListadoTareaPorCalificar;