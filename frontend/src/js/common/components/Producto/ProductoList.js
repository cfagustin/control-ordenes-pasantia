import React, { Component, Fragment } from 'react';
// Importar grids
import Grid from '../Utils/Grid'
import {standardActions} from "../Utils/Grid/StandardActions";



/**
 * COMPONENTE 
 */
class ListadoProducto extends Component{

    // Metodo que se ejecuta antes de que react renderice su contenido 
    componentWillMount = () => {
        // Obtenemos la funcion (listar)
        const {listarProductos} = this.props;
        // llamamos a la funcion
        listarProductos();
    }

    render(){

        // Obtenemos los datos
        // Obtengo eliminar
        const { data, loader, eliminar } = this.props;

        return(
            <Fragment>
                <center>
                    <h2 className="mt-4">Productos Registrados</h2>
                </center>
                
                <div className="d-flex flex-row justify-content-start mb-3">
                    <a href="/#/producto/registro" className="btn btn-primary">Crear Producto</a>
                </div>
                
                <Grid 
                    hover 
                    striped 
                    data={data} 
                    loading={loader} 
                >
                    <TableHeaderColumn
                  
                        dataField="nombre_producto"
                        dataSort
                        dataFormat={(cell, row)=>{
                            return row.nombre_producto
                        }}
                    >
                    Nombre Producto
                    </TableHeaderColumn>

                    <TableHeaderColumn
                        dataField="precio_compra"
                        dataSort
                        dataFormat={(cell, row)=>{
                            return row.precio_compra
                        }}
                    >
                    Precio Compra
                    </TableHeaderColumn>
    
                    <TableHeaderColumn
                        dataField="precio_venta"
                        dataSort
                        dataFormat={(cell, row)=>{
                            return row.precio_venta
                        }}
                    >
                    Precio Venta
                    </TableHeaderColumn>

                    <TableHeaderColumn
                        isKey
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({ 
                            editar: "producto", 
                            ver: "producto", 
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
export default ListadoProducto;