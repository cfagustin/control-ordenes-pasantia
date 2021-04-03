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
    "vendedor", // Identificador dentro del estado
    "vendedor", // endpoint a donde se realizaran las peticiones (El nombre del registro de la url en el archivo (urls.py))
    "vendedorForm", // Formulario que utilizará
    "/vendedor", // Ruta a la que se irá una vez que ejecute las peticiones
);




/**
 * FUNCION PROPIA (crearVendedor)
 */
const crearVendedor = data => (dispatch) => {

    const formData = {
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

    api.post("vendedor", formData).then(() => {
        NotificationManager.success('Registro creado', 'Éxito', 3000);
        dispatch(push("/vendedor"));
    }).catch(() => {
        NotificationManager.error('ERROR', 0);
    }).finally(() => {
        
    });
};


/**
 * FUNCION PROPIA (leerVendedor)
 */
const leerVendedor = id => (dispatch) => {
    api.get(`vendedor/${id}`).then((response) => {
        response.email = response.profile.user.email;
        response.username = response.profile.user.username;
        response.password = response.profile.user.password;
        response.nombre = response.profile.nombre;
        response.apellidos = response.profile.apellidos;
        response.telefono = response.profile.telefono;
        response.direccion = response.profile.direccion;
        response.gender = response.profile.gender;
        response.rol = {value: response.profile.rol.id, label: response.profile.rol.nombre_rol};
      
        dispatch(initializeForm("vendedorForm", response));
    }).catch(() => {
    }).finally(() => {
    });
};



/**
 * FUNCION PROPIA (editarVendedor)
 */
const editarVendedor = (id, data) => (dispatch) => {
  
    const formData = {
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
  
    api.put(`vendedor/${id}`, formData).then(() => {
        NotificationManager.success('Registro editado', 'Éxito', 3000);
        dispatch(push("/vendedor"));
    }).catch(() => {
        NotificationManager.error('ERROR', 0);
    }).finally(() => {
    });
};


export const actions = {
    ...baseReducer.actions,
    crearVendedor,
    leerVendedor,
    editarVendedor
}

export const initialState = {
    ...baseReducer.initialState
}

export const reducers = {
    ...baseReducer.reducers
}

export default handleActions(reducers, initialState);
