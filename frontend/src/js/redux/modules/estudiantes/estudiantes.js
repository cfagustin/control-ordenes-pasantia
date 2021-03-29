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
    "estudiantes", // Identificador dentro del estado
    "estudiantes", // endpoint a donde se realizaran las peticiones (El nombre del registro de la url en el archivo (urls.py))
    "estudiantesForm", // Formulario que utilizará
    "/estudiantes", // Ruta a la que se irá una vez que ejecute las peticiones
);




/**
 * FUNCION PROPIA (crearEstudiante)
 */
const crearEstudiante = (data) => (dispatch) =>{
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
        },
        carnet: data.carnet,
        contacto: data.contacto,
        telefono_contacto: data.telefono_contacto,
        direccion_contacto: data.direccion_contacto,
    }
    
    console.log("Datos enviados: ", formData);
    api.post('estudiantes', formData).then(() =>{
        console.log("enviando datos");
        NotificationManager.success('Registro creado', 'exito', 3000);
        dispatch(push("/estudiante"));
    }).catch(() =>{
        NotificationManager.error(`El usuario "${formData.profile.user.username}"  ya existe`, 'ERROR', 0);
    }).finally(() =>{
        
    });
};


/**
 * FUNCION PROPIA (LEER ESTUDIANTE)
 */
const leerEstudiante = id => (dispatch) => {
    api.get(`estudiantes/${id}`).then((response) => {
        response.email = response.profile.user.email;
        response.username = response.profile.user.username;
        response.password = response.profile.user.password;
        response.nombre = response.profile.nombre;
        response.apellidos = response.profile.apellidos;
        response.telefono = response.profile.telefono;
        response.direccion = response.profile.direccion;
        response.gender = response.profile.gender;
        response.rol = {value: response.profile.rol.id, label: response.profile.rol.nombre_rol};
        
        console.log("DATOS DE LEER ESTUDIANTE ",response)
        dispatch(initializeForm("estudiantesForm", response));
    }).catch(() => {
    }).finally(() => {
    });
};


const editarEstudiante = (id, data) => (dispatch) => {

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
        },
        carnet: data.carnet,
        contacto: data.contacto,
        telefono_contacto: data.telefono_contacto,
        direccion_contacto: data.direccion_contacto,
    }
    console.log("editar estudiante", formData);
    api.put(`estudiantes/${id}`, formData).then(() => {
        NotificationManager.success('Registro editado', 'Éxito', 3000);
        dispatch(push("/estudiante"));
    }).catch(() => {
        NotificationManager.error(`El usuario "${formData.profile.user.username}"  ya existe`, 'ERROR', 0);
    }).finally(() => {
    });
};


export const actions = {
    ...baseReducer.actions,
    crearEstudiante,
    leerEstudiante,
    editarEstudiante
}


export const initialState = {
    ...baseReducer.initialState
}


export const reducers = {
    ...baseReducer.reducers
}


export default handleActions(reducers, initialState);
