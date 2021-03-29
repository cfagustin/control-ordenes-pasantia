import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { api } from "../../../utility/api";
import { NotificationManager } from "react-notifications";
import moment from "moment";

const baseReducer = createReducer(
    "tarea",
    "tarea",
    "tareaForm",
    "/tarea",
);

const GUARDAR_DOCUMENTO_ADJUNTAR ="GUARDAR_DOCUMENTO_ADJUNTAR";
const DATA = 'DATA';

export const setData = data => ({
   type: DATA,
   data,
});



// Funcion registro Documento
export const registroTarea = (id, data, attachments=[]) => (dispatch, getStore) =>{
    const fecha = moment(data.fecha_entrega).format('YYYY-MM-DD')
    const formData={
        asignacion: id,
        titulo_tarea: data.titulo_tarea, 
        descripcion: data.descripcion,
        fecha_entrega: fecha,
        hora_entrega: data.hora_entrega,
        nota: data.nota,
    }
    console.log("registrar tarea: ",formData, attachments);
    api.postAttachments("/tarea", formData, attachments, id).then((response)=>{
        NotificationManager.success(
            'Tarea registrado Correctamente',
            'Éxito',
            3000
        );
        dispatch(push('/asignacionestudiante'));
    }).catch((erro)=>{
        NotificationManager.error(
            'Ócurrio un error al regsitrar la tarea',
            'ERROR',
            0
        );
    });
}

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

/**
 * FUNCION PROPIA LEER
 */
export const leerTarea = (id) =>(dispatch) =>{
    api.get(`tarea/${id}`).then((response) => {      
        console.log("DATOS DE LEER TAREA: ",response)
        //const fecha = moment(response.fecha_entrega)
        //response.fecha_entrega = fecha
        dispatch({type: GUARDAR_DOCUMENTO_ADJUNTAR, documento_adjuntar: response.documento_adjuntar})
        dispatch(initializeForm("tareaForm",response));
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
 export const editarTarea = (data, attachments=[]) => (dispatch, getStore) =>{ 
    
    const formData={
        asignacion: data.asignacion.id,
        titulo_tarea: data.titulo_tarea, 
        descripcion: data.descripcion,
        fecha_entrega: data.fecha_entrega,
        hora_entrega: data.hora_entrega,
        nota: data.nota,
    }

    console.log("dataformat: ", formData)
    api.putAttachments(`/tarea/${data.id}`, formData, attachments).then((response)=>{
        console.log("DATOS QUE ME DEVUELVE Put: ", response)
        NotificationManager.success(
            'Tarea editado Correctamente',
            'Éxito',
            3000
        );
        dispatch(push(`/tarea/${response.asignacion}/listar`));
    }).catch((error)=>{
        NotificationManager.error(
            'Ócurrio un error al editar el Tarea',
            'ERROR',
            0
        );
    });
}


/**
 * FUNCION PROPIA ELIMINAR MATERIAL
 */
 export const eliminarTarea = (id, id_asignacion) => (dispatch) => {
    console.log("id eliminar: ",id)

    api.eliminar(`/tarea/${id}`).then((response) =>{
        console.log("response eliminar: ",response)
        NotificationManager.success(
            'Tarea eliminado correctamente', 
            'Éxito', 
            3000
        );
        dispatch(listarTareaPorCurso(id_asignacion))
    }).catch((error) => {
        NotificationManager.error(
            'Ocurrió un error al eliminar tarea', 
            'ERROR', 
            0
        );
    })
}


export const actions = {
    ...baseReducer.actions,
    registroTarea,
    listarTareaPorCurso,
    leerTarea,
    limpiarArchivo,
    editarTarea,
    eliminarTarea,
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