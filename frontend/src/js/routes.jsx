import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import {Login, Profile, Registro} from './common/components/LoginRegister';
import Demo from './common/components/Demo/Demo';
import ProtectedRoute from './ProtectedRoute';
import Examples from './common/components/Examples/Basic';
import NotFound from './common/components/layout/NotFound/NotFound';

import '../assets/fonts/fonts.css';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
import 'bootstrap/dist/css/bootstrap.min.css';
import Grids from "./common/components/Examples/Grids";
import Notificaciones from './common/components/Examples/Notificaciones';
import ExampleTabs from './common/components/Examples/Tabs/Tabs';
require('../style/index.css');

// Importar los componentes Rol
import RolCrearContainer from './common/components/Rol/RolCrearContainer';
import RolListarContainer from './common/components/Rol/RolListContainer';

// Importar los componentes Profesion
import ProfesionCrearContainer from './common/components/Profesion/ProfesionCrearContainer';
import ProfesionListarContainer from './common/components/Profesion/ProfesionListContainer';

// Importar los componentes Curos
import CursoCrearContainer from './common/components/Curso/CursoCrearContainer';
import CursoListarContainer from './common/components/Curso/CursoListContainer';

// Importar los componente Nivel
import NivelCrearContainer from './common/components/Nivel/NivelCrearContainer';
import NivelListarContainer from './common/components/Nivel/NivelListContainer';

// Importar los componentes Grado
import GradoCrearContainer from './common/components/Grado/GradoCrearContainer';
import GradoListarContainer from './common/components/Grado/GradoListContainer';

// Importar los componentes Ciclo
import CicloCrearContainer from './common/components/Ciclo/CicloCrearContainer';
import CicloListarContainer from './common/components/Ciclo/CicloListContainer';

// Importar los componentes Seccion
import SeccionCrearContainer from './common/components/Seccion/SeccionCrearContainer';
import SeccionListarContainer from './common/components/Seccion/SeccionListContainer';

// Importar el componente CatedraticoCrearContainer.js
import CatedraticoCrearContainer from './common/components/Catedratico/CatedraticoCrearContainer';
import CatedraticoListarContainer from './common/components/Catedratico/CatedraticoListContainer';

// Importar el componente EstudianteCrearContainer.js
import EstudianteCrearContainer from './common/components/Estudiante/EstudianteCrearContainer';
import EstudianteListarContainer from './common/components/Estudiante/EstudianteListContainer';

// Importar el componente AsignacionCrearContainer.js
import AsignacionCrearContainer from './common/components/Asignacion/AsignacionCrearContainer';
import AsignacionListarContainer from './common/components/Asignacion/AsignacionListContainer';

// Importar el componente AsignacionEstudianteContainer.js
import AsignacionEstudianteCrearContainer from './common/components/AsignacionEstudiante/AsignacionEstudianteCrearContainer';
import AsignacionEstudianteListContainer from './common/components/AsignacionEstudiante/AsignacionEstudianteListContainer';

// Importar el componente MaterialCrearContainer.js
import MaterialCrearContainer from './common/components/Material/MaterialCrearContainer';
// Importar el componente MaterialListContainer.js
import MaterialListContainer from './common/components/Material/MaterialListContainer';

// Importar el componente TareaCrearContainer.js
import TareaCrearContainer from './common/components/Tarea/TareaCrearContainer';
// Importar el componente TareaListContainer.js
import TareaListContainer from './common/components/Tarea/TareaListContainer';

// Importar el componente TareaEstudianteCrearContainer.js
import TareaEstudianteCrearContainer from './common/components/TareaEstudiante/TareaEstudianteCrearContainer';
// Importar el componente TareaEstudianteListContainer.js
import TareaEstudianteListContainer from './common/components/TareaEstudiante/TareaEstudianteListContainer';
// Importar el componente CursosAsignadosListContainer 
import CursosAsignadosListContainer from './common/components/TareaEstudiante/CursosAsignadosListContainer';
// Importar el componente TareaCalificadaListContainer
import TareaCalificadaListContainer from './common/components/TareaEstudiante/TareaCalificadaListContainer';
//
import CalificarTareasListContainer from './common/components/AsignacionEstudiante/CalificarTareasListContainer';
//
import calificarTareaCrearContainer from './common/components/TareaEstudiante/CalificarTareaCrearContainer';
//
import DashboardContainer from './common/components/Dashboard/DashboardContainer';
// 
import DashboardCatedraticoContainer from './common/components/Dashboard/DashboardCatedraticoContainer';
//
import DashboardEstudianteContainer from './common/components/Dashboard/DashboardEstudianteContainer';




module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registro" component={Registro} />
                <ProtectedRoute exact path="/" component={Demo} />
                <ProtectedRoute exact path="/page2" component={Examples} />
                <ProtectedRoute exact path="/user-profile" component={Profile} />
                <ProtectedRoute exact path="/grids" component={Grids} />
                <ProtectedRoute exact path="/notifications" component={Notificaciones} />
                <ProtectedRoute exact path="/tabs" component={ExampleTabs} />

                <ProtectedRoute exact path="/dashboard" component={DashboardContainer} />
                <ProtectedRoute exact path="/dashboard-catedratico" component={DashboardCatedraticoContainer} />
                <ProtectedRoute exact path="/dashboard-estudiante" component={DashboardEstudianteContainer} />
                
                <ProtectedRoute exact path="/rol/registro" component={RolCrearContainer} />
                <ProtectedRoute exact path="/rol" component={RolListarContainer} />
                <ProtectedRoute exact path="/rol/:id" component={RolCrearContainer} />
                <ProtectedRoute exact path="/rol/:id/editar" component={RolCrearContainer} />

                <ProtectedRoute exact path="/profesion/registro" component={ProfesionCrearContainer} />
                <ProtectedRoute exact path="/profesion" component={ProfesionListarContainer} />
                <ProtectedRoute exact path="/profesion/:id" component={ProfesionCrearContainer} />
                <ProtectedRoute exact path="/profesion/:id/editar" component={ProfesionCrearContainer} />

                <ProtectedRoute exact path="/curso/registro" component={CursoCrearContainer} />
                <ProtectedRoute exact path="/curso" component={CursoListarContainer} />
                <ProtectedRoute exact path="/curso/:id" component={CursoCrearContainer} />
                <ProtectedRoute exact path="/curso/:id/editar" component={CursoCrearContainer} />

                <ProtectedRoute exact path="/nivel/registro" component={NivelCrearContainer} />
                <ProtectedRoute exact path="/nivel" component={NivelListarContainer} />
                <ProtectedRoute exact path="/nivel/:id" component={NivelCrearContainer} />
                <ProtectedRoute exact path="/nivel/:id/editar" component={NivelCrearContainer} />

                <ProtectedRoute exact path="/grado/registro" component={GradoCrearContainer} />
                <ProtectedRoute exact path="/grado" component={GradoListarContainer} />
                <ProtectedRoute exact path="/grado/:id" component={GradoCrearContainer}/>
                <ProtectedRoute exact path="/grado/:id/editar" component={GradoCrearContainer} />

                <ProtectedRoute exact path="/ciclo/registro" component={CicloCrearContainer} />
                <ProtectedRoute exact path="/ciclo" component={CicloListarContainer} />
                <ProtectedRoute exact path="/ciclo/:id" component={CicloCrearContainer} />
                <ProtectedRoute exact path="/ciclo/:id/editar" component={CicloCrearContainer} />

                <ProtectedRoute exact path="/seccion/registro" component={SeccionCrearContainer} />
                <ProtectedRoute exact path="/seccion" component={SeccionListarContainer} />
                <ProtectedRoute exact path="/seccion/:id" component={SeccionCrearContainer} />
                <ProtectedRoute exact path="/seccion/:id/editar" component={SeccionCrearContainer} />
                
                <ProtectedRoute exact path="/catedratico/registro" component={CatedraticoCrearContainer} />
                <ProtectedRoute exact path="/catedratico" component={CatedraticoListarContainer} />
                <ProtectedRoute exact path="/catedratico/:id" component={CatedraticoCrearContainer} />
                <ProtectedRoute exact path="/catedratico/:id/editar" component={CatedraticoCrearContainer} />
                
                <ProtectedRoute exact path="/estudiante/registro" component={EstudianteCrearContainer} />
                <ProtectedRoute exact path="/estudiante" component={EstudianteListarContainer} />
                <ProtectedRoute exact path="/estudiante/:id" component={EstudianteCrearContainer} />
                <ProtectedRoute exact path="/estudiante/:id/editar" component={EstudianteCrearContainer} />
                
                <ProtectedRoute exact path="/asignacion/registro" component={AsignacionCrearContainer} />
                <ProtectedRoute exact path="/asignacion" component={AsignacionListarContainer} />
                <ProtectedRoute exact path="/asignacion/:id" component={AsignacionCrearContainer} />
                <ProtectedRoute exact path="/asignacion/:id/editar" component={AsignacionCrearContainer} />
                
                <ProtectedRoute exact path="/asignacionestudiante/registro" component={AsignacionEstudianteCrearContainer} />
                <ProtectedRoute exact path="/asignacionestudiante" component={AsignacionEstudianteListContainer} />
                <ProtectedRoute exact path="/asignacionestudiante/:id" component={AsignacionEstudianteCrearContainer} />
                <ProtectedRoute exact path="/asignacionestudiante/:id/asignar" component={AsignacionEstudianteCrearContainer} />
                
                
                <ProtectedRoute exact path="/material/:id/registro" component={MaterialCrearContainer} />
                <ProtectedRoute exact path="/material/:id/listar" component={MaterialListContainer} />
                <ProtectedRoute exact path="/material/:id/ver/:ids/asignacion" component={MaterialCrearContainer} />
                <ProtectedRoute exact path="/material/:id/editar/:ids/asignacion" component={MaterialCrearContainer} />

                
                <ProtectedRoute exact path="/tarea/:id/registro" component={TareaCrearContainer} />
                <ProtectedRoute exact path="/tarea/:id/listar" component={TareaListContainer} />
                <ProtectedRoute exact path="/tarea/:id/ver/:ids/asignacion" component={TareaCrearContainer} />
                <ProtectedRoute exact path="/tarea/:id/editar/:ids/asignacion" component={TareaCrearContainer} />
                <ProtectedRoute exact path="/tarea/:id/listado-tareas/:ids" component={CalificarTareasListContainer} />
                

                <ProtectedRoute exact path="/tareaestudiante" component={CursosAsignadosListContainer} />
                <ProtectedRoute exact path="/tareaestudiante/:id/listar" component={TareaEstudianteListContainer} />
                <ProtectedRoute exact path="/tareaestudiante/:id/registro/:ids" component={TareaEstudianteCrearContainer} />
                <ProtectedRoute exact path="/tareaestudiante/:id/ver-calificacion/:ids" component={TareaCalificadaListContainer} />
                <ProtectedRoute exact path="/tareaestudiante/:id/calificar/:ids" component={calificarTareaCrearContainer} />
                <ProtectedRoute exact path="/tareaestudiante/:id" component={calificarTareaCrearContainer} />


                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
