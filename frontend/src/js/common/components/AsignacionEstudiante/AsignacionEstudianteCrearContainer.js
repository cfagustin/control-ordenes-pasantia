import { connect } from 'react-redux';
// Importar las acciones (funciones) de la estructura de redux del archivo (catedratico.js)
import { actions } from '../../../redux/modules/asignacionestudiante/asignacionestudiante';
// Importar el componente a conectar con redux (CatedraticoCrear.js)
import AsignacionEstudianteCrear from './AsignacionEstudianteCrear';


// Estados que se le enviara al componente
const ms2p = (state) => {
  return {
    // Nombre del estado a conectar
    ...state.asignacionestudiante,
  };
};

// Acciones (funciones) que obtenemos de la estructura redux
const md2p = { ...actions };

// Se establece la conexion (expecificando con que componente)
export default connect(ms2p, md2p)(AsignacionEstudianteCrear);
