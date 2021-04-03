import React, { Component, Fragment } from 'react';
import { listarCatalogoProductos } from '../../../redux/modules/compra/compra';
// Importar grids
import Grid from '../Utils/Grid'
import {standardActions} from "../Utils/Grid/StandardActions";



/**
 * COMPONENTE 
 */
class ListadoCompra extends Component{

    // Metodo que se ejecuta antes de que react renderice su contenido 
    componentWillMount = () => {
        const {listarCatalogoVendedores} = this.props;
        listarCatalogoVendedores();
    }

    render(){
        const {misCatalogos, loader, eliminar } = this.props;
        
        return(
            <Fragment>
                <center>
                    <h2 className="mt-4">Catálogo Productos</h2>
                </center>

                <Grid 
                    hover 
                    striped 
                    data={misCatalogos} 
                    loading={loader} 
                >
                    <TableHeaderColumn
                  
                        dataField="producto"
                        dataSort
                        dataFormat={(cell, row)=>{
                            if (row && row.nombre_producto){
                                return row.nombre_producto
                            }
                        }}
                    >
                    Producto
                    </TableHeaderColumn>

                    <TableHeaderColumn
                  
                        dataField="producto"
                        dataSort
                        dataFormat={(cell, row)=>{
                            if (row && row.precio_venta){
                                return row.precio_venta
                            }
                        }}
                    >
                    Precio
                    </TableHeaderColumn>

                    <TableHeaderColumn
                  
                        dataField="producto"
                        dataSort
                        dataFormat={(cell, row)=>{
                            if (row && row.vendedor.profile.nombre){
                                return row.vendedor.profile.nombre
                            }
                        }}
                    >
                    Vendedor
                    </TableHeaderColumn>

                    <TableHeaderColumn
                        isKey
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={(cell, row)=>{
                            if(row && row.id){
                                return(
                                    <div className="d-flex justify-content-center">
                                        <a href={`/#/compra/${row.id}/agregar/`} ><i className="material-icons">add</i></a>
                                    </div>
                                )
                            }
                        }}
                    >
                    Acciones
                    </TableHeaderColumn>
                </Grid>                
            </Fragment>
            
        );
    }
}
export default ListadoCompra;