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
    "catedratico", // Identificador dentro del estado
    "catedratico", // endpoint a donde se realizaran las peticiones (El nombre del registro de la url en el archivo (urls.py))
    "catedraticoForm", // Formulario que utilizará
    "/catedratico", // Ruta a la que se irá una vez que ejecute las peticiones
);




/**
 * FUNCION PROPIA (crearCatedratico)
 */
const crearCatedratico = data => (dispatch) => {

    const formData = {
        profesion: data.profesion,
        profile:{
            nombre: data.nombre,
            apellidos: data.apellidos,
            telefono: data.telefono,
            direccion: data.direccion,
            gender: data.gender,
            rol: data.rol.value,
            user:{
                email: data.email,
                username: data.username,
                password: data.password,
            }
        }
    }
    console.log("crear catedratico", formData);
    api.post("catedratico", formData).then(() => {
        NotificationManager.success('Registro creado', 'Éxito', 3000);
        dispatch(push("/catedratico"));
    }).catch(() => {
        NotificationManager.error(`El usuario "${formData.profile.user.username}"  ya existe`, 'ERROR', 0);
    }).finally(() => {
        
    });
};


/**
 * FUNCION PROPIA (leerCatedratico)
 */
const leerCatedratico = id => (dispatch) => {
    api.get(`catedratico/${id}`).then((response) => {
        response.profesion = {value: response.profesion.id, label: response.profesion.nombre_profesion}
        response.email = response.profile.user.email;
        response.username = response.profile.user.username;
        response.password = response.profile.user.password;
        response.nombre = response.profile.nombre;
        response.apellidos = response.profile.apellidos;
        response.telefono = response.profile.telefono;
        response.direccion = response.profile.direccion;
        response.gender = response.profile.gender;
        response.rol = {value: response.profile.rol.id, label: response.profile.rol.nombre_rol};
        
        console.log("DATOS DE LEER CATEDRATICO: ",response)
        dispatch(initializeForm("catedraticoForm", response));
    }).catch(() => {
    }).finally(() => {
    });
};



/**
 * FUNCION PROPIA (editarCatedratico)
 */
const editarCatedratico = (id, data) => (dispatch) => {
  
    const formData = {
        profesion: data.profesion,
        profile:{
            nombre: data.nombre,
            apellidos: data.apellidos,
            telefono: data.telefono,
            direccion: data.direccion,
            gender: data.gender,
            rol: data.rol.value,
            user:{
                email: data.email,
                username: data.username,
                password: data.password,
            }
        }
    }
    console.log("editar catedratico", formData);
    api.put(`catedratico/${id}`, formData).then(() => {
        NotificationManager.success('Registro editado', 'Éxito', 3000);
        dispatch(push("/catedratico"));
    }).catch(() => {
        NotificationManager.error(`El usuario "${formData.profile.user.username}"  ya existe`, 'ERROR', 0);
    }).finally(() => {
    });
};


export const actions = {
    ...baseReducer.actions,
    crearCatedratico,
    leerCatedratico,
    editarCatedratico
}

export const initialState = {
    ...baseReducer.initialState
}

export const reducers = {
    ...baseReducer.reducers
}

export default handleActions(reducers, initialState);
