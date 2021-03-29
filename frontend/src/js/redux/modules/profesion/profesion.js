import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "profesion", // Identificador dentro del estado
    "profesion", // endpoint a donde se realizaran las peticiones (El nombre del registro de la url en el archivo (urls.py))
    "profesionForm", // Formulario que utilizará
    "/profesion", // Ruta a la que se irá una vez que ejecute las peticiones
);

export default handleActions(reducers, initialState);
