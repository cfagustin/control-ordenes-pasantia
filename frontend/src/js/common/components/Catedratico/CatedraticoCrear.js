import React, { Component, Fragment } from 'react';
// Importar componente Formulario
import Formulario from './Formulario';




/**
 * COMPONENTE
 */
class Catedratico extends Component{
    
    // Estado inicial de mi componente
    state={
        // Bandera para saber que accion estamos realizando
        creacion: true,
    }

    // Metodo que se ejecuta antes de que react renderice su contenido 
    componentWillMount = () => {
        // Obtenemos la funcion (leerCatedratico)
        // match : Obtenemos el id
        const {leerCatedratico, match} = this.props;
        // Obtenemos el id
        const id = match.params.id;

        // Validacion en caso que en la url venga un id
        if(id){
            // El esta inicial va a ser false ya que no se esta creando 
            this.setState({creacion: false});
            // llamamos a la funcion
            leerCatedratico(id);
        }
    }


    // Crear un metodo para obtenerID
    obtenerIdEditar = (data) => {
        const { editarCatedratico } = this.props;
        const id = data.id;
        console.log("id obtenido catedr: ",id)
        // llamamos a la funcion editarCatedratico 
        editarCatedratico(id, data);
    }

    render(){
        // Visualizar los datos del props
        console.log("PROPS: ", this.props);
        // Obtener la funcion registroRol
        const { crearCatedratico} = this.props;
        // Obtener el esta inicial
        const { creacion } = this.state;
        // creacion una constante 
        // Con un metodo ternario validamos 
        // Si creacion == true entonces llamamos a la funcion (registroRol)
        // En caso contrario llamamos a la funcion de (editarRol)
        const funcionEnvio = creacion ? crearCatedratico : this.obtenerIdEditar
     
        return(
            <Fragment>
                <Formulario 
                    // Pasamos el estado incial al componente Formulario
                    creacion={creacion}
                    // Enviamos la constante al componente Formulario
                    onSubmit={funcionEnvio}
                />
            </Fragment>
        );
    }
}
export default Catedratico;