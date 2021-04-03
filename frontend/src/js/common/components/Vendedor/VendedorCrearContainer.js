import { connect } from 'react-redux';
// Importar las acciones (funciones) de la estructura de redux del archivo (vendedor.js)
import { actions } from '../../../redux/modules/vendedor/vendedor';
// Importar el componente a conectar con redux (VendedorCrear.js)
import VendedorCrear from './VendedorCrear';


// Estados que se le enviara al componente
const ms2p = (state) => {
  return {
    // Nombre del estado a conectar
    ...state.vendedor,
  };
};

// Acciones (funciones) que obtenemos de la estructura redux
const md2p = { ...actions };

// Se establece la conexion (expecificando con que componente)
export default connect(ms2p, md2p)(VendedorCrear);
