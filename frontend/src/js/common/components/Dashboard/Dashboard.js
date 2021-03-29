import React, {Component} from 'react';


/**
 * COMPONENTE DASHBOARD
 */
class DashboardPrincipal extends Component{

    componentWillMount = () =>{
        const {listarTotalCatedraticos, listarTotalUsuarios, listarTotalEstudiantes, listarTotalGrados, listarTotalSecciones} = this.props;
        listarTotalCatedraticos();
        listarTotalUsuarios();
        listarTotalEstudiantes();
        listarTotalGrados();
        listarTotalSecciones();
    }


    render(){
        const {catedratico, usuario, estudiante, grado, seccion} = this.props;
        console.log("props: ", this.props)

        return (
            <div className="py-4">
                <h2>Dashboard</h2>
                <div className="row">
                    

                    <div className="mb-4 col-lg-4">
                        <div className="mb-4 card card-small">
                            <div className="border-bottom card-header d-flex justify-content-center">
                                <h4 className="m-0">Total Usuarios <i className="material-icons">people_alt</i></h4>
                            </div>
                            <div className="p-0 px-3 pt-3">
                                <center>
                                    <h4>{usuario ? usuario.total_usuario: []}</h4>
                                </center>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4 col-lg-4">
                        <div className="mb-4 card card-small">
                            <div className="border-bottom card-header d-flex justify-content-center">
                                <h4 className="m-0">Total Catedráticos <i className="material-icons">people_alt</i></h4>
                            </div>
                            <div className="p-0 px-3 pt-3">
                                <center>
                                    <h4>{catedratico ? catedratico.total_catedratico: []}</h4>
                                </center>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4 col-lg-4">
                        <div className="mb-4 card card-small">
                            <div className="border-bottom card-header d-flex justify-content-center">
                                <h4 className="m-0">Total Estudiantes <i className="material-icons">person_add</i></h4>
                            </div>
                            <div className="p-0 px-3 pt-3">
                                <center>
                                    <h4>{estudiante ? estudiante.total_estudiante: []}</h4>
                                </center>
                            </div>
                        </div>
                    </div>
              
                    <div className="mb-4 col-lg-4">
                        <div className="mb-4 card card-small">
                            <div className="border-bottom card-header d-flex justify-content-center">
                                <h4 className="m-0">Total Grados <i className="material-icons"></i></h4>
                            </div>
                            <div className="p-0 px-3 pt-3">
                                <center>
                                    <h4>{grado ? grado.total_grado: []}</h4>
                                </center>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4 col-lg-4">
                        <div className="mb-4 card card-small">
                            <div className="border-bottom card-header d-flex justify-content-center">
                                <h4 className="m-0">Total Secciones <i className="material-icons">account_tree</i></h4>
                            </div>
                            <div className="p-0 px-3 pt-3">
                                <center>
                                    <h4>{seccion ? seccion.total_seccion: []}</h4>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default DashboardPrincipal;