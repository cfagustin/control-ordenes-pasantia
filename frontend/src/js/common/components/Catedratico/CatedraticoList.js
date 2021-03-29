import React, { cloneElement, Component, Fragment } from 'react';
//import { eliminarRol } from '../../../redux/modules/rol/rol';
// Importar grids
import Grid from '../Utils/Grid'
import {standardActions} from "../Utils/Grid/StandardActions";



/**
 * COMPONENTE 
 */
class ListadoCatedratico extends Component{

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
                    <h2 className="mt-4">Catedraticos Registrados</h2>
                </center>
                
                <div className="d-flex flex-row justify-content-start mb-3">
                    <a href="/#/catedratico/registro" className="btn btn-primary">Crear Catedrartico</a>
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
                        dataField="profile"
                        dataSort
                        dataFormat={(cell, row)=>{
                            return cell.nombre;
                        }}
                    >
                    Perfil
                    </TableHeaderColumn>

                    <TableHeaderColumn 
                        dataField="profile"
                        dataSort
                        dataFormat={(cell, row)=>{
                            return cell.user.email;
                        }}
                    >
                    Email
                    </TableHeaderColumn>

                    <TableHeaderColumn 
                        dataField="profesion"
                        dataSort
                        dataFormat={(cell, row)=>{
                            return cell.nombre_profesion;
                        }}
                    >
                    Profesion
                    </TableHeaderColumn>

                    <TableHeaderColumn 
                        dataField="profile"
                        dataSort
                        dataFormat={(cell, row)=>{
                            return cell.rol.nombre_rol;
                        }}
                    >
                    Rol
                    </TableHeaderColumn>
                                
                    <TableHeaderColumn
                        isKey
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({ 
                            editar: "catedratico", 
                            ver: "catedratico", 
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
export default ListadoCatedratico;