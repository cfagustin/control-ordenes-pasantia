// Importar el modulo de react redux
import {connect} from 'react-redux';
// Importar las acciones 
import {actions} from '../../../redux/modules/tarea/tarea';
// Importar los componentes a conectar
import TareaList from './TareaList';


// Se obtiene todos los estados a traves del (state) 
const ms2p = (state) => {
    return {
      // Se retorna el estado con el que se quiere conectar es decir (tarea)
      // (...)  : Operador de Propagación utilizado para expandir o extender una matriz
      // Pasar parametros a una funcion
      // Insertar un array dentro de otro array
      ...state.tarea,
    };
    
};

// Se obtiene todas las acciones (crear, editar, listar eliminar) de redux
const md2p = { ...actions };

// Se estable la conexion pasandole como parametro el (estado, accion) al componente con el que se va a conectar 
export default connect(ms2p, md2p)(TareaList);


