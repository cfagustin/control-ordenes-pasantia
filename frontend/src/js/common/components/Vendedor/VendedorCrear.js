import React, { Component, Fragment } from 'react';
// Importar componente Formulario
import Formulario from './Formulario';




/**
 * COMPONENTE
 */
class Vendedor extends Component{
    
    // Estado inicial de mi componente
    state={
        // Bandera para saber que accion estamos realizando
        creacion: true,
    }

    // Metodo que se ejecuta antes de que react renderice su contenido 
    componentWillMount = () => {
        // Obtenemos la funcion (leerVendedor)
        // match : Obtenemos el id
        const {leerVendedor, match} = this.props;
        // Obtenemos el id
        const id = match.params.id;

        // Validacion en caso que en la url venga un id
        if(id){
            // El esta inicial va a ser false ya que no se esta creando 
            this.setState({creacion: false});
            // llamamos a la funcion
            leerVendedor(id);
        }
    }


    // Crear un metodo para obtenerID
    obtenerIdEditar = (data) => {
        const { editarVendedor } = this.props;
        const id = data.id;
        // llamamos a la funcion editarVendedor 
        editarVendedor(id, data);
    }

    render(){
        // Obtener la funcion crearVendedor
        const { crearVendedor} = this.props;
        // Obtener el esta inicial
        const { creacion } = this.state;
        // creacion una constante 
        // Con un metodo ternario validamos 
        // Si creacion == true entonces llamamos a la funcion (crearVendedor)
        // En caso contrario llamamos a la funcion de (obtnerIdEditar)
        const funcionEnvio = creacion ? crearVendedor : this.obtenerIdEditar
     
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
export default Vendedor;