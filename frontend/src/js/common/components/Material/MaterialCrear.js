// Importar el modulo de react
import React, {Component, Fragment} from 'react';
// Importar el componente Formulario
import Formulario from './Formulario';



/**
 * COMPONENTE Material
 */
class Material extends Component{

    state={
        creacion: true,
        archivo: null,
    }    

     // Metodo que se ejecuta antes de que react renderice su contenido
    componentWillMount = () => {
        // Obtenemos la funcion (leerMaterial)
        // match : Obtenemos el id
        const {leerMaterial, match} = this.props;
        // Obtenemos el id material
        const idMaterial = match.params.id;
        // Obtenemos el id asignacion
        const idAsignacion = match.params.ids;
        // Obtenemos la url actual
        const url = match.url;

        //#/material/13/editar/2/asignacion
        // Validacion si es ver o editar se ejecuta la funcion (leerMaterial)
        if(url == `/material/${idMaterial}/ver/${idAsignacion}/asignacion` || url == `/material/${idMaterial}/editar/${idAsignacion}/asignacion`){
            // El esta inicial va a ser false ya que no se esta creando 
            this.setState({creacion: false});
            // llamamos a la funcion
            leerMaterial(idMaterial);
        }
    }

    // Funcion para actualizar archivo
    setArchivo = (archivo) =>{
        this.setState({archivo});
    }

    // Funcion para registrar
    registro = (data) =>{
        const {registroMaterial, match}= this.props;
        const id = match.params.id
        registroMaterial(id, data, [{file: this.state.archivo, name: 'archivo'},])
    }

    // Funcion para editar
    editar = (data) => {
        const {editarMaterial, match}= this.props;
        //const id = match.params.id
        editarMaterial(data, [{file: this.state.archivo, name: 'archivo'},])
    }


    render(){
        // Obtenemos registro (props)
        const {documento_adjuntar, limpiarArchivo, match} = this.props;
        // Obtenemos el esta inicial
        const {creacion} = this.state;
        // creacion una constante 
        // Con un metodo ternario validamos 
        // Si creacion == true entonces llamamos a la funcion (registroRol)
        // En caso contrario llamamos a la funcion de (editarRol)       
        const funcionEnvio = creacion ? this.registro : this.editar;
        // Obtener idAsignacion
        const idAsignacion = match.params.ids;

        return(
            <Fragment>
                <Formulario 
                    creacion={creacion}
                    onSubmit={funcionEnvio}
                    setArchivo={this.setArchivo}
                    documento_adjuntar={documento_adjuntar}
                    limpiarArchivo={limpiarArchivo}
                    idAsignacion={idAsignacion}
                />
            </Fragment>
        );
    }
}

export default Material;