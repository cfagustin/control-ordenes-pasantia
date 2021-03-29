/**
 * ESTE ARCHIVO VA CONECTAR CON LA ESTRUCTURA DE REDUX
 */
// Importar el modulo react-redux
import {connect} from 'react-redux';
// Importar las acciones del archivo de redux (tareaestudiante.js)
import {actions} from '../../../redux/modules/tareaestudiante/tareaestudiante';
// Importar el componente al que nos vamos a conectar
import CursosAsignadosList from './CursosAsignadosList';


/**
 * Se declara una funcion flecha que a traves en su parametro (state) se obtiene todos los estados
 */
const ms2p = (state) =>{
    return{
        // En el archivo (rootReducers.js) debemos de configurar el nombre (tareaestudiante)
        // Retornar el estado con el que se quiere conectar es decir (tareaestudiante)
        // (...)  : Operador de Propagación utilizado para expandir o extender una matriz
        // Pasar parametros a una funcion
        // Insertar un array dentro de otro array
        ...state.tareaestudiante,
    }
}



/**
 * Se declara un objeto
 * y se obtiene todas las acciones del archivo redux (listar, crear, editar, eliminar)
 */
const md2p ={
    ...actions,
};


/**
 * Se estable la conexion
 * Pasandole como parametro el (estado, accion) al componente con el que se va a conectar 
 */
export default connect(ms2p, md2p)(CursosAsignadosList);