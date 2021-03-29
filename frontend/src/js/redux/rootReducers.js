import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import login from './modules/cuenta/login';
import register from './modules/cuenta/register';
import profile from './modules/cuenta/profile';
import usuarios from './modules/usuarios/usuarios';
import notificaciones from './modules/notificaciones/notificaciones';
import estudiantes from './modules/estudiantes/estudiantes';

// Importar la estructura del redux (archivo (rol.js)) 
import rol from './modules/rol/rol';
// Importar la estructura del redux (archivo nivel.js)
import nivel from './modules/nivel/nivel';
// Importar la estructura del redux (archivo grado.js)
import grado from './modules/grado/grado';
// Importa la estructura del redux (archivo profesion.js)
import profesion from './modules/profesion/profesion';
// Importa la estructura del redux (archivo curso.js)
import curso from './modules/curso/curso';
// Importa la estructura del redux (archivo ciclo.js)
import ciclo from './modules/ciclo/ciclo';
// Importa la estructura del redux (archivo seccion.js)
import seccion from './modules/seccion/seccion';
// Importar la estructura del redux (archivo catedratico.js)
import catedratico from './modules/catedratico/catedratico';
// Importar la estructura del redux (archivo estudiante.js)
import estudiante from './modules/estudiantes/estudiantes';
// Importar la estructura del redux (archivo asignacion.js)
import asignacion from './modules/asignacion/asignacion';
// Importar la estrucuta del redux (archivo asignacionestudiante.js)
import asignacionestudiante from './modules/asignacionestudiante/asignacionestudiante';
// Importar la estructura del redux (archivo materail.js)
import material from './modules/material/material';
// Importar la estructura del redux (archivo tarea.js)
import tarea from './modules/tarea/tarea';
// Importar la estructura del redux (tareaestudiante)
import tareaestudiante from './modules/tareaestudiante/tareaestudiante';
// Importar la estructura del redux (dashboard)
import dashboard from './modules/dashboard/dashboard';
// Importar la estructura del redux (dashboard)
import dashboardcatedratico from './modules/dashboard/dashboard';
import dashboardestudiante from './modules/dashboard/dashboard';


// Configurar (Agregar) el nombre
export default combineReducers({
    form: formReducer,
    login,
    register,
    profile,
    usuarios,
    routing,
    notificaciones,
    rol,
    profesion,
    curso,
    nivel,
    grado,
    ciclo,
    seccion,
    catedratico,
    estudiantes,
    asignacion,
    asignacionestudiante,
    material,
    tarea,
    tareaestudiante,
    dashboard,
    dashboardcatedratico,
    dashboardestudiante,
});
