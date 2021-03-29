import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { api } from "../../../utility/api";
import { NotificationManager } from "react-notifications";

// ------------------------------------
// Constants
// ------------------------------------

const baseReducer = createReducer(
    "asignacionestudiante", // Identificador dentro del estado
    "asignacionestudiante", // endpoint a donde se realizaran las peticiones (El nombre del registro de la url en el archivo (urls.py))
    "asignacionestudianteForm", // Formulario que utilizará
    "/asignacionestudiante", // Ruta a la que se irá una vez que ejecute las peticiones
);

const DATA = 'DATA';


export const setData = data => ({
   type: DATA,
   data,
});


/**
 * ESTRUCTURA BASICA DE REDUX
 */

/**
 * FUNCION PROPIA (crear)
 */
const registrarAsignacionEstudiante = (id, data) => (dispatch) =>{

    const formData = {
        asignacion: id,
        estudiante: data.estudiante.value,
    }
    console.log("Datos enviados: ", formData);
    api.post('asignacionestudiante', formData).then(() =>{
        NotificationManager.success('Asignacion Exitosa', 'exito', 3000);
        dispatch(push('/asignacionestudiante'));
        //dispatch(initializeForm(AsignacionEstudiante));
    }).catch(() =>{
        NotificationManager.error('Error en la creación', 'ERROR');
    }).finally(() =>{
    });
};


/**
 * FUNCION PROPIA LISTA CURSOS ASIGNADOS
 */
const listarCursosAsignados = () => (dispatch) => {
    api.get('/asignacionestudiante/listarCursos').then((response) => {
        const data={results:response}
        dispatch(setData(data));
    }).catch((error) => {
    }).finally(() => {
    });
};



/**
 * FUNCION PROPIA LISTAR
 */
 export const listarTareaPorCurso =(id_asignacion)=>(dispatch) =>{
    // Creamos un objeto
    const formData ={
        id_asignacion,
    }

    // Llamar a traves del api al metodo get
    api.get('/tarea/listado', formData).then((response) =>{
        const data={results:response}
        console.log("data devueltos listar tarea por curso: ", data)
        dispatch(setData(data));
    }).catch((error) =>{
    }).finally(()=>{
    });
}



const listarEstudiantesAsignados = (id_asignacion) => (dispatch) => {
    const data ={
        id_asignacion
    }
    api.get('/asignacionestudiante/listado', data).then((response) => {
        const data={results:response}
        console.log("datos devueltos: ",data)
        dispatch(setData(data));
    }).catch((error) => {
    }).finally(() => {
    });
};


export const actions = {
    ...baseReducer.actions,
    registrarAsignacionEstudiante,
    listarCursosAsignados,
    listarEstudiantesAsignados,
}

export const initialState = {
    ...baseReducer.initialState,
}

export const reducers = {
    ...baseReducer.reducers,
    [DATA]: (state, { data }) => {
       return {
        ...state,
        data, 
        };
    },
}


export default handleActions(reducers, initialState);
