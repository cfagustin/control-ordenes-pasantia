import React, {Component} from 'react';
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";


/**
 * COMPONENTE DASHBOARD
 */
class DashboardVendedor extends Component{

    componentWillMount = () =>{
        const {totalVentasPorProducto, promedioPrecios, totalVentas} = this.props;
        totalVentasPorProducto();
        promedioPrecios();
        totalVentas();
    }


    render(){
        const {loader, mistotalVentas, mistotalVP, mispromedios} = this.props;
        console.log("props: ", this.props)

        return (
            <div className="py-4">
                <h2>Dashboard</h2>
                <div className="row">
                    <div className="mb-4 col-lg-12">
                        <div className="mb-4 card card-small">
                            <div className="border-bottom card-header d-flex justify-content-center">
                                <h4 className="m-0"><center>Total Ventas por Producto</center></h4>
                            </div>
                            <div className="p-0 px-3 pt-3">
                                <center>
                                <Grid 
                                data={mistotalVP} 
                                loading={loader}  
                                >

                                    <TableHeaderColumn 
                                    dataField="producto"
                                    dataSort
                                    dataFormat={(cell, row)=>{
                                        if (row && row.cantidad_vendida){
                                            return row.cantidad_vendida;
                                        }
                                    }}
                                >
                                Cantidad
                                </TableHeaderColumn>

                                    <TableHeaderColumn 
                                    isKey
                                    dataField="producto"
                                    dataSort
                                    dataFormat={(cell, row)=>{
                                        if (row && row.nombre_producto){
                                            return row.nombre_producto;
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
                                            return row.precio_venta;
                                        }
                                    }}
                                >
                                Precio
                                </TableHeaderColumn>

                                <TableHeaderColumn 
                                    dataField="producto"
                                    dataSort
                                    dataFormat={(cell, row)=>{
                                        if (row && row.total_ventas){
                                            return row.total_ventas;
                                        }
                                    }}
                                >
                                Total
                                </TableHeaderColumn>

                                
                                </Grid>
                                </center>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 col-lg-6">
                        <div className="mb-4 card card-small">
                            <div className="border-bottom card-header d-flex justify-content-center">
                                <h4 className="m-0" ><center>Total de Ventas</center></h4>
                            </div>
                            <div className="p-0 px-3 pt-3">
                                <center>
                                    <h4>Q {mistotalVentas ? mistotalVentas.totales: []}</h4>
                                </center>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4 col-lg-6">
                        <div className="mb-4 card card-small">
                            <div className="border-bottom card-header d-flex justify-content-center">
                                <h4 className="m-0" ><center>Promedio Precios</center></h4>
                            </div>
                            <div className="p-0 px-3 pt-3">
                                <center>
                                    <h4>Q {mispromedios ? mispromedios.promedio: []}</h4>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default DashboardVendedor;