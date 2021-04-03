import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";



const TOTALVENTAS = 'TOTALVENTAS';
const TOTALVENTASPORPRODUCTO = 'TOTALVENTASPORPRODUCTO';
const PROMEDIOPRECIOS = 'PROMEDIOPRECIOS';


export const setTotalVentas = mistotalVentas => ({
    type: TOTALVENTAS,
    mistotalVentas,
 });

export const setTotalVentasPorProducto = mistotalVP => ({
    type: TOTALVENTASPORPRODUCTO,
    mistotalVP,
 });

 export const setPromedioPrecios = mispromedios => ({
    type: PROMEDIOPRECIOS,
    mispromedios,
 });
          
            
export const totalVentas = () => (dispatch) =>{
    // Llamar a traves del api al metodo get
    api.get('/producto/totalVentas').then((response) =>{
        dispatch(setTotalVentas(response))
    }).catch((error) =>{
    }).finally(()=>{
    });
}

  
export const totalVentasPorProducto = () => (dispatch) =>{
    // Llamar a traves del api al metodo get
    api.get('/producto/totalVentasPorProducto').then((response) =>{
        const mistotalVP={results:response}
        dispatch(setTotalVentasPorProducto(mistotalVP))
    }).catch((error) =>{
    }).finally(()=>{
    });
}


export const promedioPrecios = () => (dispatch) =>{
    // Llamar a traves del api al metodo get
    api.get('/producto/promedioPrecios').then((response) =>{
        dispatch(setPromedioPrecios(response))
    }).catch((error) =>{
    }).finally(()=>{
    });
}




// 2 Exportar las acciones
export const actions = {
    totalVentasPorProducto,
    totalVentas,
    promedioPrecios,
};


// 4 Reducer
export const reducers = {
    // 1. Tiene que tener un identificador unico por ello se creo la constante
    // 2. Lo que tiene que alterar o actualizar es (data)
    [TOTALVENTASPORPRODUCTO]: (state, { mistotalVP }) => {
        return {
            ...state,
            mistotalVP,
        };
    },
    [TOTALVENTAS]: (state, { mistotalVentas }) => {
        return {
            ...state,
            mistotalVentas,
        };
    },
    [PROMEDIOPRECIOS]: (state, { mispromedios }) => {
        return {
            ...state,
            mispromedios,
        };
    },
};

// 3 Estado inicial
export const initialState = {
    loader: false,
    // registro se coloca en null aya que en la funcion leer nos devuelve un (Object)
    mistotalVP: [],
    mistotalVentas: [],
    mispromedios: null,
};


export default handleActions(reducers, initialState);