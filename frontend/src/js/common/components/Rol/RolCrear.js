import React, { Component, Fragment } from 'react';
// Importar el componente Formulario
import Formulario from './Formulario';





/**
 * COMPONENTE
 */
class Rol extends Component{

    // Estado inicial de mi componente
    state={
        // Bandera para saber que accion estamos realizando
        crear: true,
    }

     // Metodo que se ejecuta antes de que react renderice su contenido 
    componentWillMount = () => {
        // Obtenemos la funcion (leer)
        // match : Obtenemos el id
        const {leer, match} = this.props;
        // Obtenemos el id
        const id = match.params.id;

        // Validacion en caso que en la url venga un id
        if(id){
            // El esta inicial va a ser false ya que no se esta creando 
            this.setState({crear: false});
            // llamamos a la funcion
            leer(id);
        }
    }
    
    render(){
        // Visualizar los datos del props
        console.log("PROPS: ", this.props);
        // Obtener la funcion registroRol
        const {registroRol, editarRol} = this.props;
        // Obtener el esta inicial
        const { crear } = this.state;
        // Crear una constante 
        // Con un metodo tenario validamos 
        // Si crear == true entonces llamamos a la funcion (registroRol)
        // En caso contrario llamamos a la funcion de (editarRol)
        const funcionEnvio = crear ? registroRol : editarRol

        return(
            <Fragment>
                <Formulario 
                    // Pasamos el estado incial al componente Formulario
                    crear={crear}
                    // Enviamos la constante al componente Formulario
                    onSubmit={funcionEnvio}
                />
            </Fragment>
        )
    }
}
export default Rol;