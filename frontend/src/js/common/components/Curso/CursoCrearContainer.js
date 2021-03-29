import { connect } from 'react-redux';
// Importar las acciones
import { actions } from '../../../redux/modules/curso/curso';
// Importar los componentes a conectar
import CursoCrear from './CursoCrear';


// Estados que se le enviara al componente
const ms2p = (state) => {
  return {
    // Nombre del estado a conectar
    ...state.curso,
  };
};

// Acciones
const md2p = { ...actions };

// Se establece la conexion (expecificando con que componente)
export default connect(ms2p, md2p)(CursoCrear);
