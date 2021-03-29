import React, { Component, Fragment } from 'react';
// Importar el componente Formulario
import Formulario from './Formulario';





/**
 * COMPONENTE
 */
class Profesion extends Component{

    // Estado inicial de mi componente
    state={
        // Bandera para saber que accion estamos realizando
        creacion: true,
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
            this.setState({creacion: false});
            // llamamos a la funcion
            leer(id);
        }
    }


    // Crear un metodo para obtenerID
    obtenerIdEditar = (data) => {
        const { editar } = this.props;
        const id = data.id;
        // llamamos a la funcion editar 
        editar(id, data);
    }

    
    render(){
        // Visualizar los datos del props
        console.log("PROPS: ", this.props);
        // Obtener la funcion registroRol
        const {crear, editar} = this.props;
        // Obtener el esta inicial
        const { creacion } = this.state;
        // creacion una constante 
        // Con un metodo ternario validamos 
        // Si creacion == true entonces llamamos a la funcion (registroRol)
        // En caso contrario llamamos a la funcion de (editarRol)
        const funcionEnvio = creacion ? crear : this.obtenerIdEditar

        return(
            <Fragment>
                <Formulario 
                    // Pasamos el estado incial al componente Formulario
                    creacion={creacion}
                    // Enviamos la constante al componente Formulario
                    onSubmit={funcionEnvio}
                />
            </Fragment>
        )
    }
}
export default Profesion;