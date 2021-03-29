import React, {Component} from 'react';
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";


/**
 * COMPONENTE DASHBOARD
 */
class DashboardEstudiante extends Component{

    componentWillMount = () =>{
        const {listarCursosAsignadosEstudiante, proximasTareasEntregar} = this.props;
        listarCursosAsignadosEstudiante();
        //proximasTareasEntregar();
    }


    render(){
        const {misCursosEstudiante, loader} = this.props;
        console.log("propss: ", this.props)

        return (
            <div className="py-4">
                <h2>Dashboard</h2>
                <div className="row">
                    <div className="mb-4 col-lg-4">
                        <div className="mb-4 card card-small">
                            <div className="border-bottom card-header d-flex justify-content-center">
                                <h4 className="m-0">Cursos Asignados</h4>
                            </div>
                            <div className="p-0 px-3 pt-3">
                                <center>
                                <Grid 
                                data={misCursosEstudiante} 
                                loading={loader}  
                                >

                                    <TableHeaderColumn 
                                    isKey
                                    dataField="asignacion"
                                    dataSort
                                    dataFormat={(cell, row)=>{
                                        if (cell && cell.curso.nombre_curso){
                                            return cell.curso.nombre_curso;
                                        }
                                    }}
                                >
                                Cursos
                                </TableHeaderColumn>
                                </Grid>
                                </center>
                            </div>
                        </div>
                    </div>

                    
                    
                </div>
            </div>
        );
    }
}
export default DashboardEstudiante;