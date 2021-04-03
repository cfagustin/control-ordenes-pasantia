import React, { Component, Fragment } from 'react';
// Importar componente Formulario
import Formulario from './Formulario';
import Grid from '../Utils/Grid'
import {standardActions} from "../Utils/Grid/StandardActions";
import { TableHeaderColumn } from 'react-bootstrap-table';



/**
 * COMPONENTE
 */
class Compra extends Component{
    
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
            this.setState({crear: false});
            // llamamos a la funcion
            leer(id);
        }
    }


    // Funcion para registrar compra
    // En data: viene la informacion para registrar compra 
    registrarCompra = (data) =>{
        const {registrarCompra }= this.props;
        registrarCompra(data)
    }



    render(){
        // Obtener el esta inicial
        const { creacion } = this.state;
        // 
        const funcionEnvio = this.registrarCompra
      

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
export default Compra;