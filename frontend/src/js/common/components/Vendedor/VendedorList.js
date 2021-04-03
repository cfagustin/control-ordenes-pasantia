import React, { cloneElement, Component, Fragment } from 'react';
// Importar grids
import Grid from '../Utils/Grid'
import {standardActions} from "../Utils/Grid/StandardActions";



/**
 * COMPONENTE 
 */
class ListadoVendedor extends Component{

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
                    <h2 className="mt-4">Vendedores Registrados</h2>
                </center>
                
                <div className="d-flex flex-row justify-content-start mb-3">
                    <a href="/#/vendedor/registro" className="btn btn-primary">Crear Vendedor</a>
                </div>
                
                <Grid 
                    hover 
                    striped 
                    data={data} 
                    loading={loader} 
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
                            editar: "vendedor", 
                            ver: "vendedor", 
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
export default ListadoVendedor;