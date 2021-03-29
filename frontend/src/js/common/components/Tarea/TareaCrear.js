// Importar el modulo de react
import React, {Component, Fragment} from 'react';
// Importar el componente Formulario
import Formulario from './Formulario';



/**
 * COMPONENTE Material
 */
class Tarea extends Component{

    state={
        creacion: true,
        archivo: null,
    }

    // Funcion que se ejecuta antes de renderizar el componente
    componentWillMount =()=>{
        // Obtenemos la funcion leerTarea y match
        const {leerTarea, match} =this.props
        // Obtenemos el idTarea
        const idTarea = match.params.id;
        // Obtenemos el id asignacion
        const idAsignacion = match.params.ids;
        // Obtenemos la url actual
        const url = match.url;

        //#/material/13/editar/2/asignacion
        // Validacion si es ver o editar se ejecuta la funcion (leerMaterial)
        if(url == `/tarea/${idTarea}/ver/${idAsignacion}/asignacion` || url == `/tarea/${idTarea}/editar/${idAsignacion}/asignacion`){
            // El esta inicial va a ser false ya que no se esta creando 
            this.setState({creacion: false});
            // llamamos a la funcion
            leerTarea(idTarea);
        }  
    }

    // Funcion para actualizar archivo
    setArchivo = (archivo) =>{
        this.setState({archivo});
    }

    // Funcion para registrar tarea
    registro = (data) =>{
        console.log("entro a registro tarea")
        const {registroTarea, match}= this.props;
        const id = match.params.id
        registroTarea(id, data, [{file: this.state.archivo, name: 'archivo'},])
    }


    // Funcion para editar
    editar = (data) => {
        const {editarTarea, match}= this.props;
        //const id = match.params.id
        editarTarea(data, [{file: this.state.archivo, name: 'archivo'},])
    }


    render(){
        
        // Obtenemos registro
        const {documento_adjuntar, limpiarArchivo, match} = this.props;
        console.log("PROPS 5: ", this.props)
        // Obtenemos el estado inicial
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
export default Tarea;