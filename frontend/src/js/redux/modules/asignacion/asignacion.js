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
    "asignacion", // Identificador dentro del estado
    "asignacion", // endpoint a donde se realizaran las peticiones (El nombre del registro de la url en el archivo (urls.py))
    "asignacionForm", // Formulario que utilizará
    "/asignacion", // Ruta a la que se irá una vez que ejecute las peticiones
);






/**
 * ESTRUCTURA BASICA DE REDUX
 */

/**
 * FUNCION PROPIA (crear)
 */
const crearAsignacion = (data) => (dispatch) =>{
    const formData = {
        //imagen_portada: data.imagen_portada,
        descripcion: data.descripcion,
        ciclo: data.ciclo.value,
        grado: data.grado.value,
        seccion: data.seccion.value,
        curso: data.curso.value,
        catedratico: data.catedratico.value,
    }
    console.log("Datos enviados: ", formData);
    api.post('asignacion', formData).then(() =>{
        console.log("enviando datos");
        NotificationManager.success('Registro creado', 'exito', 3000);
        dispatch(push("/asignacion"));
    }).catch(() =>{
        NotificationManager.error('Error en la creación', 'ERROR');
    }).finally(() =>{
    });
};



/**
 * FUNCION PROPIA (leer)
 */
const leerAsignacion = id => (dispatch) => {
    api.get(`asignacion/${id}`).then((response) => {
        response.descripcion = response.descripcion
        response.ciclo = {value: response.ciclo.id, label: response.ciclo.ciclo_escolar}
        response.grado = {value: response.grado.id, label: response.grado.nombre_grado}
        response.seccion = {value: response.seccion.id, label: response.seccion.nombre_seccion}
        response.curso = {value: response.curso.id, label: response.curso.nombre_curso}
        response.catedratico = {value: response.catedratico.id, label: response.catedratico.profile.nombre}
        
        console.log("DATOS DE LEER ASIGNACION: ",response)
        dispatch(initializeForm("asignacionForm", response));
    }).catch(() => {
    }).finally(() => {
    });
};


/**
 * FUNCION PROPIA (editar)
 */
const editarAsignacion = (id, data) => (dispatch) => {
    
    const formData = {
        //imagen_portada: data.imagen_portada,
        descripcion: data.descripcion,
        ciclo: data.ciclo.value,
        grado: data.grado.value,
        seccion: data.seccion.value,
        curso: data.curso.value,
        catedratico: data.catedratico.value,
    }
    
    console.log("editar asignacion", formData);
    api.put(`asignacion/${id}`, formData).then(() => {
        NotificationManager.success('Registro editado', 'Éxito', 3000);
        dispatch(push("/asignacion"));
    }).catch(() => {
        NotificationManager.error('Error al editar', 'ERROR', 0);
    }).finally(() => {
    });
};

export const actions = {
    ...baseReducer.actions,
    crearAsignacion,
    leerAsignacion,
    editarAsignacion
}

export const initialState = {
    ...baseReducer.initialState
}

export const reducers = {
    ...baseReducer.reducers
}

export default handleActions(reducers, initialState);
