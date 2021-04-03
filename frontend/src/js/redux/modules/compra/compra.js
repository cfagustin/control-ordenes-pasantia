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
    "compra", // Identificador dentro del estado
    "compra", // endpoint a donde se realizaran las peticiones (El nombre del registro de la url en el archivo (urls.py))
    "compraForm", // Formulario que utilizará
    "/compra", // Ruta a la que se irá una vez que ejecute las peticiones
);


const LISTADOPRODUCTOSREGISTRADOS = 'LISTADOPRODUCTOSREGISTRADOS';
const GUARDAR_REGISTRO_PRODUCTO = 'GUARDAR_REGISTRO_PRODUCTO';
const LISTADOCATALOGO = 'LISTADOCATALOGO';


export const setCatalogo = misCatalogos => ({
    type: LISTADOCATALOGO,
    misCatalogos,
 });

const setPage = page => ({
    type: constants.PAGE,
    page,
});



/**
 * FUNCION PROPIA (crear)
 */
 const registrarCompra = (data) => (dispatch) =>{
    const formData = {
        cantidad: data.cantidad,
        precio: data.precio_venta,
        producto: data.id,
        vendedor: data.vendedor.id,
    }

    api.post('/compra', formData).then(() =>{
        NotificationManager.success('Compra Exitosa', 'exito', 3000);
        dispatch(push('/compra'));
    }).catch(() =>{
        NotificationManager.error('Error en la creación', 'ERROR');
    }).finally(() =>{
    })
};



 export const leer = (id) => (dispatch) => {
    api.get(`/producto/${id}`).then((response) =>{
        // Para llamar reducers se debe hacer a traves del dispatch
        // 1. GUARDAR_REGISTRO_PRODUCTO: llamar al Identificador unico
        // 2. a registro se le va enviar lo que tiene response (registro: response)
        dispatch({type: GUARDAR_REGISTRO_PRODUCTO, REGISTRO: response})
        //initializeForm('rol', :  Nombre del formulario a inicializar
        // response)) : Los datos con los que se va llenar el formulario
        dispatch(initializeForm('productoForm', response));
    }).catch((error) => {
        NotificationManager.error(
            'Ocurrió', 
            'ERROR', 
            0
        );
    });
}





/**
 * FUNCION PROPIA LISTAR
 */
 export const listarCatalogoVendedores =(page = 1)=>(dispatch) =>{
    const params = { page };
    // Llamar a traves del api al metodo get
    api.get('/producto/listadoCatalogoVendedores').then((response) =>{
        const misCatalogos={results:response}
        dispatch(setCatalogo(misCatalogos));
        dispatch(setPage(page));
    }).catch((error) =>{
    }).finally(()=>{
    });
}



export const actions = {
    ...baseReducer.actions,
    registrarCompra,
    leer,
    listarCatalogoVendedores,
}

export const initialState = {
    ...baseReducer.initialState,
    regitro: null,
    misCatalogos: [],
}

export const reducers = {
    ...baseReducer.reducers,
    [GUARDAR_REGISTRO_PRODUCTO]: (state, { registro }) => {
        return {
            ...state,
            registro,
        };
    },
    [LISTADOCATALOGO]: (state, { misCatalogos }) => {
        return {
         ...state,
        misCatalogos, 
        };
    }
}

export default handleActions(reducers, initialState);
