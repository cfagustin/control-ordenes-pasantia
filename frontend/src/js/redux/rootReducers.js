import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import login from './modules/cuenta/login';
import register from './modules/cuenta/register';
import profile from './modules/cuenta/profile';
import usuarios from './modules/usuarios/usuarios';
import notificaciones from './modules/notificaciones/notificaciones';

// Importar la estructura del redux (archivo (rol.js)) 
import rol from './modules/rol/rol';
// Importar la estructura del redux (archivo (vendedor.js))
import vendedor from './modules/vendedor/vendedor';
// Importar la estructura del redux (archivo (producto.js))
import producto from './modules/producto/producto';
//
import compra from './modules/compra/compra';
//
import dashboardvendedor from './modules/dashboard/dashboard';


// Configurar (Agregar) el nombre
export default combineReducers({
    form: formReducer,
    login,
    register,
    profile,
    usuarios,
    routing,
    notificaciones,
    rol,
    vendedor,
    producto,
    compra,
    dashboardvendedor,
});
