import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "ciclo", // Identificador dentro del estado
    "ciclo", // endpoint a donde se realizaran las peticiones (El nombre del registro de la url en el archivo (urls.py))
    "cicloForm", // Formulario que utilizará
    "/ciclo", // Ruta a la que se irá una vez que ejecute las peticiones
);

export default handleActions(reducers, initialState);
