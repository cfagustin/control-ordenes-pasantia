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
    "producto", // Identificador dentro del estado
    "producto", // endpoint a donde se realizaran las peticiones (El nombre del registro de la url en el archivo (urls.py))
    "productoForm", // Formulario que utilizará
    "/producto", // Ruta a la que se irá una vez que ejecute las peticiones
);


const DATA = 'DATA';

export const setData = data => ({
   type: DATA,
   data,
});




/**
 * FUNCION PROPIA LISTAR
 */
 export const listarProductos =()=>(dispatch) =>{
    
    // Llamar a traves del api al metodo get
    api.get('/producto/listadoProductos').then((response) =>{
        const data={results:response}
        dispatch(setData(data));
    }).catch((error) =>{
    }).finally(()=>{
    });
}



/**
 * FUNCION PROPIA (crearProducto)
 */
const crearProducto = (data) => (dispatch) => {

    const formData = {
        nombre_producto: data.nombre_producto,
        precio_compra: data.precio_compra,
        precio_venta: data.precio_venta,
    }
    console.log("crear producto", formData);
    api.post("producto", formData).then(() => {
        NotificationManager.success('Registro creado', 'Éxito', 3000);
        dispatch(push("/producto"));
    }).catch(() => {
        NotificationManager.error('ERROR', 0);
    }).finally(() => { 
    });
};


/**
 * FUNCION PROPIA (leerProducto)
 */
 const leerProducto = (id) => (dispatch) => {
   
    api.get(`producto/${id}`).then((response) => {
        response.nombre_producto = response.nombre_producto,
        response.precio_compra = response.precio_compra,
        response.precio_venta = response.precio_venta,
        dispatch(initializeForm("productoForm", response));
    }).catch(() => {
    }).finally(() => {
    });
};


/**
 * FUNCION PROPIA (editarProducto)
 */
 const editarProducto = (id, data) => (dispatch) => {
   
    const formData = {
        nombre_producto: data.nombre_producto,
        precio_compra: data.precio_compra,
        precio_venta: data.precio_venta,
        
    }
    console.log("editar producto", formData);
    api.put(`producto/${id}`, formData).then(() => {
        NotificationManager.success('Registro editado', 'Éxito', 3000);
        dispatch(push("/producto"));
    }).catch(() => {
        NotificationManager.error('ERROR', 0);
    }).finally(() => {
    });
};



export const actions = {
    ...baseReducer.actions,
    listarProductos,
    crearProducto,
    leerProducto,
    editarProducto,
}

export const initialState = {
    ...baseReducer.initialState
}

export const reducers = {
    ...baseReducer.reducers,
    [DATA]: (state, { data }) => {
        return {
         ...state,
         data, 
        };
    },
}

export default handleActions(reducers, initialState);
