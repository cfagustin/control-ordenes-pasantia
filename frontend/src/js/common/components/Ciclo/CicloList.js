import React, { Component, Fragment } from 'react';
//import { eliminarRol } from '../../../redux/modules/rol/rol';
// Importar grids
import Grid from '../Utils/Grid'
import {standardActions} from "../Utils/Grid/StandardActions";



/**
 * COMPONENTE 
 */
class ListadoCiclo extends Component{

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
                    <h2 className="mt-4">Ciclos Registrados</h2>
                </center>
                
                <div className="d-flex flex-row justify-content-start mb-3">
                    <a href="/#/ciclo/registro" className="btn btn-primary">Crear Ciclo</a>
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
                        isKey
                        dataField="ciclo_escolar"
                        dataSort
                    >
                    Ciclo Escolar
                    </TableHeaderColumn>
            
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({ 
                            editar: "ciclo", 
                            ver: "ciclo", 
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
export default ListadoCiclo;