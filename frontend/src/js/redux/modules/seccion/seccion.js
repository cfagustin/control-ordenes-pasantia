import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "seccion", // Identificador dentro del estado
    "seccion", // endpoint a donde se realizaran las peticiones (El nombre del registro de la url en el archivo (urls.py))
    "seccionForm", // Formulario que utilizará
    "/seccion", // Ruta a la que se irá una vez que ejecute las peticiones
);

export default handleActions(reducers, initialState);
