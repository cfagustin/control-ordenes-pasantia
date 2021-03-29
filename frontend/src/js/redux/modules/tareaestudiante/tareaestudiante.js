import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { api } from "../../../utility/api";
import { NotificationManager } from "react-notifications";


/**
 * ESTRUCTURA DE REDUX
 */

 const baseReducer = createReducer(
    "tareaestudiante",
    "tareaestudiante",
    "tareaestudianteForm",
    "/tareaestudiante",
);

const DATA = 'DATA';
const GUARDAR_DOCUMENTO_ADJUNTAR ="GUARDAR_DOCUMENTO_ADJUNTAR";

export const setData = data => ({
   type: DATA,
   data,
});






/**
 * FUNCION PROPIA PARA REGISTRAR
 */
export const registrarTareaEstudiante = (idTarea, idEstudiante, data, attachments=[]) => (dispatch, getStore) => {
    const formData={
        tarea: idTarea,
        estudiante: idEstudiante,
        descripcion: data.descripcion,
    }
    
    api.postAttachments("/tareaestudiante", formData, attachments).then((response)=>{
        NotificationManager.success(
            'Tarea Estudiante registrado Correctamente',
            'Éxito',
            3000
        );
        dispatch(push(`/tareaestudiante/${idTarea}/listar`));
    }).catch((erro)=>{
        NotificationManager.error(
            'Ócurrio un error al regsitrar la tarea estudiante',
            'ERROR',
            0
        );
    });
}



/**
 * FUNCION PROPIA PARA LISTAR
 */
export const listarCursosAsignados = () => (dispatch) =>{

    api.get('/tareaestudiante/listarMisCursos').then((response) => {
        const data={results:response}
        console.log("listar los cursos del estudiante: ", data)
        dispatch(setData(data));
    }).catch((error) => {
    }).finally(() => {
    });
}


/**
 * FUNCION PROPIA LISTAR TAREAS POR CURSO
 */
 export const listarTareasPorMisCursos =(id_asignacion)=>(dispatch) =>{
    // Creamos un objeto
    const formData ={
        id_asignacion,
    }

    // Llamar a traves del api al metodo get
    api.get('/tareaestudiante/listarTareas', formData).then((response) =>{
        const datos={results:response}
        console.log("listar tarea por curso estudiante: ", datos)
        dispatch(setData(datos));
    }).catch((error) =>{
    }).finally(()=>{
    });
}



/**
 * FUNCION PROPIA LISTAR TAREAS ENVIADAS
 */
 export const listarTareasCalificadas =(idTarea, idEstudiante)=>(dispatch) =>{
    const formData = {
        tarea: idTarea,
        estudiante: idEstudiante,
    }
  
    // Llamar a traves del api al metodo get
    api.get('/tareaestudiante/listarTareasCalificadas', formData).then((response) =>{
        const data1={results:response}
        console.log("listar tareas enviadas: ", data1)
        dispatch(setData(data1));
    }).catch((error) =>{
    }).finally(()=>{
    });
}



/**
 * FUNCION PROPIA LISTAR TAREAS POR CALIFICAR
 */
 export const listarTareasPorCalificar =(idTarea)=>(dispatch) =>{
    const formData = {
        tarea: idTarea,
    }
  
    // Llamar a traves del api al metodo get
    api.get('/tareaestudiante/listarTareasPorCalificar', formData).then((response) =>{
        const data={results:response}
        console.log("listar tareas por calificar: ", data)
        dispatch(setData(data));
    }).catch((error) =>{
    }).finally(()=>{
    });
}


/**
 * FUNCION PROPIA LEER
 */
 export const leerPorTareaEstudiante = (id) =>(dispatch) =>{
    api.get(`tareaestudiante/${id}`).then((response) => {      
        console.log("DATOS DE LEER POR TAREA ESTUDIANTE: ",response)
        //const fecha = moment(response.fecha_entrega)
        //response.fecha_entrega = fecha
        dispatch({type: GUARDAR_DOCUMENTO_ADJUNTAR, documento_adjuntar: response.documento_adjuntar})
        dispatch(initializeForm("tareaestudianteForm",response));
    }).catch(() => {
    }).finally(() => {
    });
}


/**
 * FUNCION PROPIA LIMPIAR REDUX
 */
 export const limpiarArchivo =() =>(dispatch) =>{
    dispatch({type: GUARDAR_DOCUMENTO_ADJUNTAR, documento_adjuntar: null});
}


/**
 * FUNCION PROPIA EDITAR MATERIAL
 */
 export const calificarTarea = (data) => (dispatch, getStore) =>{ 
    const formData={
        calificacion: data.calificacion,
    }

    api.put(`/tareaestudiante/${data.id}`, formData).then((response)=>{
        console.log("DATOS QUE ME DEVUELVE Put calificar: ", response)
        NotificationManager.success(
            'Tarea Calificada Correctamente',
            'Éxito',
            3000
        );
        dispatch(push('/asignacionestudiante'));
    }).catch((error)=>{
        NotificationManager.error(
            'Ócurrio un error al calificar tarea',
            'ERROR',
            0
        );
    });
}


/**
 * Se crea un objeto y
 * se exporta las acciones (funciones propias)
 */
export const actions = {
    ...baseReducer.actions,
    registrarTareaEstudiante,
    listarCursosAsignados,
    listarTareasPorMisCursos,
    listarTareasCalificadas,
    listarTareasPorCalificar,
    leerPorTareaEstudiante,
    limpiarArchivo,
    calificarTarea,
}


export const initialState = {
    ...baseReducer.initialState
}


export const reducers = {
    ...baseReducer.reducers,
    [GUARDAR_DOCUMENTO_ADJUNTAR]: (state, { documento_adjuntar }) => {
        return {
            ...state,
            documento_adjuntar,
        };
    },
    [DATA]: (state, { data }) => {
        return {
            ...state,
            data, 
        };
    }
}


export default handleActions(reducers, initialState);