import React, { Component } from 'react';
import {Link, NavLink} from "react-router-dom";

class SideBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { toggleOpen, navToggle, logOut, user} = this.props;
        console.log("datos: ", user)

        let rol = 'Administrador'
        if (user && user.profile && user.profile.rol){
            rol = user.profile.rol.nombre_rol
        }

        

        return (
            <aside className={`main-sidebar px-0 col-12 col-md-3 col-lg-2 ${toggleOpen?'':'open'}`}>
                <div className="main-navbar">
                    <nav
                        className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0 navbar navbar-light">
                        <a  href="#" className="w-100 mr-0 navbar-brand" >
                            <div className="d-table m-auto">
                                <img id="main-logo"
                                    className="d-inline-block align-top mr-1"
                                    src={require('assets/img/logo.png')}
                                    alt="Logo" />
                            </div>
                        </a>
                        <a  className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
                            onClick={navToggle}>
                            <i className="material-icons"></i>
                        </a>
                    </nav>
                </div>
                <div className="nav-wrapper">
                    <ul className="nav--no-borders flex-column nav">
                        <li className="nav-item">
                            <NavLink to="/" exact className="nav-link " activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">edit</i>
                                </div>
                                <span>Home</span>
                            </NavLink>
                        </li>

                        {rol == 'Administrador' &&
                        <li className="nav-item">
                            <NavLink to="/dashboard" exact className="nav-link " activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">edit</i>
                                </div>
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        }
                        
                        {rol == 'Administrador' &&
                        <li className="nav-item">
                            <NavLink to="/rol" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Roles</span>
                            </NavLink>
                        </li>
                        }

                        {rol == 'Administrador' &&
                        <li className="nav-item">
                            <NavLink to="/profesion" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Profesiones</span>
                            </NavLink>
                        </li>
                        }

                        {rol == 'Administrador' &&
                        <li className="nav-item">
                            <NavLink to="/curso" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Cursos</span>
                            </NavLink>
                        </li>
                        }

                        {rol == 'Administrador' &&
                        <li className="nav-item">
                            <NavLink to="/nivel" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Niveles</span>
                            </NavLink>
                        </li>
                        }

                        {rol == 'Administrador' &&
                        <li className="nav-item">
                            <NavLink to="/grado" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Grados</span>
                            </NavLink>
                        </li>
                        }

                        {rol == 'Administrador' &&
                        <li className="nav-item">
                            <NavLink to="/ciclo" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Ciclos</span>
                            </NavLink>
                        </li>
                        }
                        
                        {rol == 'Administrador' &&
                        <li className="nav-item">
                            <NavLink to="/seccion" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Secciones</span>
                            </NavLink>
                        </li>
                        }
                        
                        {rol == 'Administrador' &&
                        <li className="nav-item">
                            <NavLink to="/catedratico" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Catedraticos</span>
                            </NavLink>
                        </li>
                        }

                        {rol == 'Administrador' &&
                        <li className="nav-item">
                            <NavLink to="/estudiante" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Estudiantes</span>
                            </NavLink>
                        </li>
                        }            

                        {rol == 'Administrador' &&
                        <li className="nav-item">
                            <NavLink to="/asignacion" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Asignacion Curso</span>
                            </NavLink>
                        </li>
                        }

                        {rol == 'Catedratico' &&
                        <li className="nav-item">
                            <NavLink to="/dashboard-catedratico" exact className="nav-link " activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">edit</i>
                                </div>
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        }

                        {rol == 'Catedratico' &&
                        <li className="nav-item">
                            <NavLink to="/asignacionestudiante" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Asignar Estudiante</span>
                            </NavLink>
                        </li>
                        }

                        {rol == 'Estudiante' &&
                        <li className="nav-item">
                            <NavLink to="/dashboard-estudiante" exact className="nav-link " activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">edit</i>
                                </div>
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        }
                        
                        {rol == 'Estudiante' &&
                        <li className="nav-item">
                            <NavLink to="/tareaestudiante" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Mis Cursos</span>
                            </NavLink>
                        </li>
                        }
                    </ul>
                </div>
            </aside>
        )
    }
}

export default SideBar;
