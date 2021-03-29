import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";



// Declarar una constante
const GUARDAR_LISTADO_ROL = 'GUARDAR_LISTADO_ROL';
const GUARDAR_REGISTRO_ROL = 'GUARDAR_REGISTRO_ROL';




/**
 * (LISTAR ROLES)
 * FUNCION QUE REALIZA UNA PETICION A LA API DEL TIPO (GET)
 */
export const listar = () => (dispatch) => {   
    api.get('/rol').then((response) => {
        //console.log("Response", response);
        // Para llamar reducers se debe hacer a traves del dispatch
        // 1. GUARDAR_LISTADO_ROL: llamar al Identificador unico
        // 2. a data se le va enviar lo que tiene response (data: response)
        dispatch({type: GUARDAR_LISTADO_ROL, data: response})

    }).catch((error) => {
        console.log("error", error);

        NotificationManager.error(
            'Ocurrió un error al listar los roles', 
            'ERROR', 
            0
        );
    });
}



/**
 * (VER UN ROL)
 * FUNCION QUE REALIZAR UNA PETICION A LA API DEL TIPO (GET)
 */
export const leer = (id) => (dispatch) => {
    api.get(`/rol/${id}`).then((response) =>{
        console.log("Response: ", response);
        // Para llamar reducers se debe hacer a traves del dispatch
        // 1. GUARDAR_REGISTRO_ROL: llamar al Identificador unico
        // 2. a registro se le va enviar lo que tiene response (registro: response)
        dispatch({type: GUARDAR_REGISTRO_ROL, REGISTRO: response})
        //initializeForm('rol', :  Nombre del formulario a inicializar
        // response)) : Los datos con los que se va llenar el formulario
        dispatch(initializeForm('rol', response));
    }).catch((error) => {
        console.log("error", error);

        NotificationManager.error(
            'Ocurrió un error al ver el rol', 
            'ERROR', 
            0
        );
    });
}




/**
 * (REGISTRAR ROL)
 * FUNCION QUE REALIZA UNA PETICION A LA API DE TIPO (POST)
 */
// 1 Crear una accion
export const registroRol = () => (dispatch, getStore) => {
    // Acceder al formulario
    console.log("getStore", getStore());
    // Obtener los valores de form 
    const formData = getStore().form.rol.values;
    console.log("formData: ", formData);

    // Registrar los datos del (formData) al backend
    api.post('/rol', formData).then((response) => {
        NotificationManager.success(
            'Rol registrado correctamente', 
            'Éxito', 
            3000
        );
        // Vamos a redireccionar al archivo de registrar
        dispatch(push('/rol'));
        
    }).catch((error) => {
        console.log("error", error);

        NotificationManager.error(
            'Ocurrió un error al registrar rol', 
            'ERROR', 
            0
        );
    })
}



/**
 * (EDITAR ROL)
 * FUNCION QUE REALIZA UNA PETICION A LA API DE TIPO (put)
 */
// 1 Crear una accion
export const editarRol = () => (dispatch, getStore) => {
    // Acceder al formulario
    console.log("getStore", getStore());
    // Obtener los valores de form 
    const formData = getStore().form.rol.values;
    console.log("formData: ", formData);
    
    // Obtenemos el id de formData
    const id = formData.id

    // Registrar los datos del (formData) al backend
    api.put(`/rol/${id}`, formData).then((response) => {
        NotificationManager.success(
            'Rol editado correctamente', 
            'Éxito', 
            3000
        );
        // Vamos a redireccionar al archivo de registrar
        dispatch(push('/rol'));
        
    }).catch((error) => {
        console.log("error", error);

        NotificationManager.error(
            'Ocurrió un error al editar rol', 
            'ERROR', 
            0
        );
    })
}



/**
 * (ELIMINAR UN ROL)
 * FUNCION QUE REALIZAR UNA PETICION A LA API DEL TIPO (GET)
 */
export const eliminar = (id) => (dispatch) => {
    api.eliminar(`/rol/${id}`).then((response) =>{
        NotificationManager.success(
            'Rol eliminado correctamente', 
            'Éxito', 
            3000
        );
        // Vamos a redireccionar a la funcion listar()
        dispatch(listar());
        
    }).catch((error) => {
        console.log("error", error);

        NotificationManager.error(
            'Ocurrió un error al eliminar rol', 
            'ERROR', 
            0
        );
    })
}




// 2 Exportar las acciones
export const actions = {
    //llamada a la accion
    registroRol,
    listar,
    leer,
    editarRol,
    eliminar,
};


// 4 Reducer
export const reducers = {
    // 1. Tiene que tener un identificador unico por ello se creo la constante
    // 2. Lo que tiene que alterar o actualizar es (data)
    [GUARDAR_LISTADO_ROL]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },

    // 1. Tiene que tener un identificador unico por ello se creo la constante
    // 2. Lo que tiene que alterar o actualizar es (data)
    [GUARDAR_REGISTRO_ROL]: (state, { registro }) => {
        return {
            ...state,
            registro,
        };
    },
};


// 3 Estado inicial
export const initialState = {
    loader: false,
    // data se coloca en null ya que en la funcion listar nos devuelve un (Object)
    data: [],
    // registro se coloca en null aya que en la funcion leer nos devuelve un (Object)
    registro: null
};


export default handleActions(reducers, initialState);
