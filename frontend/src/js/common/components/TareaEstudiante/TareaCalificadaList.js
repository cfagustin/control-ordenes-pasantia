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
class ListadoTareaCalificada extends Component{

    // Funcion que se ejecutar antes de renderizar el componente
    
    componentWillMount = () =>{
        // Obtener la funcion propia ListarCursosAsignados
        const {listarTareasCalificadas, match} = this.props;
        // Obtener el idAsignacion
        const idTarea = match.params.id;
        const idEstudiante = 1;
        // Llamar la funcion propia 
        listarTareasCalificadas(idTarea, idEstudiante);
        
    }
    


    render(){
        // Obtenemos data y loader
        const {data, loader, match} = this.props;
        console.log("data nuevo : ", data)
        const idAsignacion = match.params.ids
        const url = `/#/tareaestudiante/${idAsignacion}/listar`;

        return(
            <Fragment>
                <center>
                    <h2>Tarea Calificada</h2>
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
                    isKey
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
                    Calificación
                    </TableHeaderColumn>
                </Grid>              
            </Fragment>
        );
    }
}
export default ListadoTareaCalificada;