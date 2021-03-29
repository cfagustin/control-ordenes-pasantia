// Importar el modulo de react-redux
import {connect} from 'react-redux';
// Importar las actions
import {actions} from '../../../redux/modules/material/material';
// Importar los componentes a conectar
import MaterialCrear from './MaterialCrear';


// Estado que se le enviaran al componente
const ms2p = (state) =>{
    return{
        ...state.material,
    }
}

// acciones
const md2p = {...actions};

// Se establece la conexion (especificando con que componente)
export default connect(ms2p, md2p)(MaterialCrear);
