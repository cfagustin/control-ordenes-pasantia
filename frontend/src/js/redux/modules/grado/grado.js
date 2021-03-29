import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { api } from "../../../utility/api";
import { NotificationManager } from "react-notifications";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "grado", // Identificador dentro del estado
    "grado", // endpoint a donde se realizaran las peticiones (El nombre del registro de la url en el archivo (urls.py))
    "gradoForm", // Formulario que utilizará
    "/grado", // Ruta a la que se irá una vez que ejecute las peticiones
);




/**
 * FUNCION PROPIA (crearGrado)
 */
const crearGrado = data => (dispatch) => {

    const formData = {
        nivel: data.nivel,
        nombre_grado: data.nombre_grado,
    }
    console.log("crear grado", formData);
    api.post("grado", formData).then(() => {
        NotificationManager.success('Registro creado', 'Éxito', 3000);
        dispatch(push("/grado"));
    }).catch(() => {
        NotificationManager.error('Error en la creación', 'ERROR');
    }).finally(() => {
        
    });
};


/**
 * FUNCION PROPIA (leerGrado)
 */
const leerGrado = id => (dispatch) => {
    api.get(`grado/${id}`).then((response) => {
        response.nivel = {value: response.nivel.id, label: response.nivel.nombre_nivel}
        console.log("OBTUVE NIVEL leer grado: ",response)
        dispatch(initializeForm("gradoForm", response));
    }).catch(() => {
    }).finally(() => {
    });
};

const editarGrado = (id, data) => (dispatch) => {

    const formData = {
        nivel: data.nivel,
        nombre_grado: data.nombre_grado,
    }
    console.log("editar grado", formData);
    api.put(`grado/${id}`, formData).then(() => {
        NotificationManager.success('Registro editado', 'Éxito', 3000);
        dispatch(push("/grado"));
    }).catch(() => {
        NotificationManager.error('Error en la edición', 'ERROR', 0);
    }).finally(() => {
    });
};




actions["crearGrado"] = crearGrado;
actions["leerGrado"] = leerGrado;
actions["editarGrado"] = editarGrado;

export default handleActions(reducers, initialState);
