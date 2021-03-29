import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "../../../utility/api";



// Crear constantes
const LOADER = 'REGISTER';
const DATA = 'DATA';


const setLoader = loader => ({
    type: LOADER,
    loader,
});

const setData = data => ({
    type: DATA,
    data,
});


/**
 * ESTRUCTURA BASICA DE REDUX
 */

// 1. Funcion Crear Catedratico
const crear = (data) => (dispatch) =>{
    const formData = {
        nombre_grado: data.nombre_grado,
        descripcion: data.descripcion,
        nivel: data.nivel,
    }
    console.log("Datos enviados: ", formData);
    dispatch(setLoader(true));
    api.post('/grado', formData).then(() =>{
        console.log("enviando datos");
        NotificationManager.success('Registro creado', 'exito', 3000);
    }).catch(() =>{
        NotificationManager.error('Error en la creación', 'ERROR');
    }).finally(() =>{
        dispatch(setLoader('false'));
    });
};


// 2. Exportar nuestra funcion (crear)
export const actions = {
    crear,
    //listar,
};

// 3 Reducer
export const reducers = {
    // 1. Tiene que tener un identificador unico por ello se creo la constante
    // 2. Lo que tiene que alterar o actualizar es (data)
    [DATA]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
};

// 4. Estado inicial
export const initialState={
    loader: false,
    data: null,
};


// 5.
export default handleActions(reducers, initialState);
