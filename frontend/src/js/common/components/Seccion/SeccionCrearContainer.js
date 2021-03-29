import { connect } from 'react-redux';
// Importar las acciones
import { actions } from '../../../redux/modules/seccion/seccion';
// Importar los componentes a conectar
import SeccionCrear from './SeccionCrear';


// Estados que se le enviara al componente
const ms2p = (state) => {
  return {
    // Nombre del estado a conectar
    ...state.seccion,
  };
};

// Acciones
const md2p = { ...actions };

// Se establece la conexion (expecificando con que componente)
export default connect(ms2p, md2p)(SeccionCrear);
