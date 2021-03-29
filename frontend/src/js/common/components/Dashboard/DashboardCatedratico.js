import React, {Component} from 'react';
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";


/**
 * COMPONENTE DASHBOARD
 */
class DashboardCatedratico extends Component{

    componentWillMount = () =>{
        const {listarCursosAsignados, totalTareasPendientesCalificar, totalTareasPendientesCalificarPorCurso} = this.props;
        listarCursosAsignados();
        totalTareasPendientesCalificar();
        totalTareasPendientesCalificarPorCurso();
    }


    render(){
        const {misCursos, loader, misTareasPendientes, misTareasPendientesPorCurso} = this.props;
        console.log("props: ", this.props)

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
                                data={misCursos} 
                                loading={loader}  
                                >

                                    <TableHeaderColumn 
                                    isKey
                                    dataField="curso"
                                    dataSort
                                    dataFormat={(cell, row)=>{
                                        if (cell && cell.nombre_curso){
                                            return cell.nombre_curso;
                                        }
                                    }}
                                >
                                Curso
                                </TableHeaderColumn>
                                </Grid>
                                </center>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4 col-lg-8">
                        <div className="mb-4 card card-small">
                            <div className="border-bottom card-header d-flex justify-content-center">
                                <h4 className="m-0"><center>Total Tareas Pendientes por Curso</center></h4>
                            </div>
                            <div className="p-0 px-3 pt-3">
                                <center>
                                <Grid 
                                data={misTareasPendientesPorCurso} 
                                loading={loader}  
                                >

                                    <TableHeaderColumn 
                                    isKey
                                    dataField="curso"
                                    dataSort
                                    dataFormat={(cell, row)=>{
                                        if (row && row.asignacion){
                                            return row.asignacion;
                                        }
                                    }}
                                >
                                Curso
                                </TableHeaderColumn>

                                <TableHeaderColumn 
                                    dataField="curso"
                                    dataSort
                                    dataFormat={(cell, row)=>{
                                        if (row && row.total_tareas){
                                            return row.total_tareas;
                                        }
                                    }}
                                >
                                Tareas
                                </TableHeaderColumn>

                                <TableHeaderColumn 
                                    dataField="curso"
                                    dataSort
                                    dataFormat={(cell, row)=>{
                                        if (row.total_pendiente == 0){
                                            return row.total_pendiente ='0'
                                        }else{
                                            return row.total_pendiente;
                                        }
                                    }}
                                >
                                Pendientes de calificar
                                </TableHeaderColumn>
                                </Grid>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
                   <div className="row">
                        <div className="mb-4 col-lg-4">
                            <div className="mb-4 card card-small">
                                <div className="border-bottom card-header d-flex justify-content-center">
                                    <h4 className="m-0" ><center>Total Tareas Pendientes</center></h4>
                                </div>
                                <div className="p-0 px-3 pt-3">
                                    <center>
                                        <h4>{misTareasPendientes ? misTareasPendientes.total_por_calificar: []}</h4>
                                    </center>
                                </div>
                            </div>
                        </div>
                   </div>
            </div>
        );
    }
}
export default DashboardCatedratico;