import React, { cloneElement, Component, Fragment } from 'react';
// Importar grids
import Grid from '../Utils/Grid'
import {standardActions} from "../Utils/Grid/StandardActions";



/**
 * COMPONENTE 
 */
class ListadoAsignacion extends Component{

    // Metodo que se ejecuta antes de que react renderice su contenido 
    componentWillMount = () => {
        // Obtenemos la funcion (listar)
        const {listar} = this.props;
        // llamamos a la funcion
        listar();
    }

    render(){

        // Obtenemos los datos
        // Obtengo eliminar
        const { data, loader, eliminar } = this.props;

        return(
            <Fragment>
                <center>
                    <h2 className="mt-4">Asignaciones</h2>
                </center>
                
                <div className="d-flex flex-row justify-content-start mb-3">
                    <a href="/#/asignacion/registro" className="btn btn-primary">Crear Asignación</a>
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
                        dataField="catedratico"
                        dataSort
                        dataFormat={(cell, row)=>{
                            return cell.profile.nombre;
                        }}
                    >
                    Catedratico
                    </TableHeaderColumn>

                    <TableHeaderColumn 
                        dataField="ciclo"
                        dataSort
                        dataFormat={(cell, row)=>{
                            return cell.ciclo_escolar;
                        }}
                    >
                    Ciclo
                    </TableHeaderColumn>

                    <TableHeaderColumn 
                        dataField="grado"
                        dataSort
                        dataFormat={(cell, row)=>{
                            return cell.nombre_grado;
                        }}
                    >
                    Grado
                    </TableHeaderColumn>

                    <TableHeaderColumn 
                        dataField="seccion"
                        dataSort
                        dataFormat={(cell, row)=>{
                            return cell.nombre_seccion;
                        }}
                    >
                    Sección
                    </TableHeaderColumn>

                    <TableHeaderColumn 
                        dataField="curso"
                        dataSort
                        dataFormat={(cell, row)=>{
                            return cell.nombre_curso;
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
                            editar: "asignacion", 
                            ver: "asignacion", 
                            eliminar: eliminar,
                        })}
                    >
                    Acciones
                    </TableHeaderColumn>
                </Grid>                
            </Fragment> 
        );
    }
}
export default ListadoAsignacion;