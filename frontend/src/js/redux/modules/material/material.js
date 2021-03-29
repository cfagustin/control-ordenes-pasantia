import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { api } from "../../../utility/api";
import { NotificationManager } from "react-notifications";


const baseReducer = createReducer(
    "material",
    "material",
    "materialForm",
    "/material",
);

const GUARDAR_DOCUMENTO_ADJUNTAR ="GUARDAR_DOCUMENTO_ADJUNTAR";
const DATA = 'DATA';

export const setData = data => ({
   type: DATA,
   data,
});


/**
 * FUNCION PROPIA REGISTRAR MATERIAL
 */
export const registroMaterial = (id, data, attachments=[]) => (dispatch, getStore) =>{ 
    const formData={
        asignacion: id,
        titulo_material: data.titulo_material, 
        descripcion: data.descripcion,
    }

    api.postAttachments("/material", formData, attachments, id).then((response)=>{
        NotificationManager.success(
            'Material registrado Correctamente',
            'Éxito',
            3000
        );
        dispatch(push('/asignacionestudiante'));
    }).catch((erro)=>{
        NotificationManager.error(
            'Ócurrio un error al regsitrar el material',
            'ERROR',
            0
        );
    });
}

/**
 * FUNCION PROPIA (listarMaterialesPorCurso)
 */
export const listarMaterialesPorCurso = (id_asignacion) => (dispatch)=>{
    console.log("listar id asignacion: ",id_asignacion)
    const data = {
        id_asignacion,
    } 
    api.get('material/listado', data).then((response) =>{
        const data={results:response}
        console.log("datos devueltos: ",data)
        dispatch(setData(data));
    }).catch((error) => {
    }).finally(() => {
    })
}


/**
 * FUNCION PROPIA (leerCatedratico)
 */
 export const leerMaterial = id => (dispatch) => {
     
    api.get(`material/${id}`).then((response) => {      
        console.log("DATOS DE LEER MATERIAL: ",response)
        dispatch({type: GUARDAR_DOCUMENTO_ADJUNTAR, documento_adjuntar: response.documento_adjuntar})
        dispatch(initializeForm("materialForm",response));
    }).catch(() => {
    }).finally(() => {
    });
};


/**
 * FUNCION PROPIA LIMPIAR REDUX
 */
export const limpiarArchivo =() =>(dispatch) =>{
    dispatch({type: GUARDAR_DOCUMENTO_ADJUNTAR, documento_adjuntar: null});
}



/**
 * FUNCION PROPIA EDITAR MATERIAL
 */
export const editarMaterial = (data, attachments=[]) => (dispatch, getStore) =>{ 
    
    console.log("attachments: ",attachments)
    const formData={
        asignacion: data.asignacion.id,
        titulo_material: data.titulo_material, 
        descripcion: data.descripcion,
    }
    console.log("dataformat: ", formData)
    api.putAttachments(`/material/${data.id}`, formData, attachments).then((response)=>{
        console.log("DATOS QUE ME DEVUELVE Put: ", response)
        NotificationManager.success(
            'Material editado Correctamente',
            'Éxito',
            3000
        );
        dispatch(push(`/material/${response.asignacion}/listar`));
    }).catch((error)=>{
        NotificationManager.error(
            'Ócurrio un error al editar el material',
            'ERROR',
            0
        );
    });
}


/**
 * FUNCION PROPIA ELIMINAR MATERIAL
 */
export const eliminarMaterial = (id, id_asignacion) => (dispatch) => {
    console.log("id eliminar: ",id)

    api.eliminar(`/material/${id}`).then((response) =>{
        console.log("response eliminar: ",response)
        NotificationManager.success(
            'Material eliminado correctamente', 
            'Éxito', 
            3000
        );
        dispatch(listarMaterialesPorCurso(id_asignacion))
    }).catch((error) => {
        NotificationManager.error(
            'Ocurrió un error al eliminar material', 
            'ERROR', 
            0
        );
    })
}



export const actions = {
    ...baseReducer.actions,
    registroMaterial,
    listarMaterialesPorCurso,
    leerMaterial,
    limpiarArchivo,
    editarMaterial,
    eliminarMaterial,
}

export const initialState = {
    ...baseReducer.initialState,  
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