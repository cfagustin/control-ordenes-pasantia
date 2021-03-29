// Importar el modulo de react
import React, {Component, Fragment} from 'react';
// Importar el componente Formulario
import FormularioCalificarTarea from './FormularioCalificarTarea';



/**
 * COMPONENTE Material
 */
class CalificarTareaCrear extends Component{

    state={
        creacion: true,
        archivo: null,
    }

    // Funcion que se ejecuta antes de renderizar el componente
    componentWillMount =()=>{
        // Obtenemos la funcion leerTarea y match
        const {leerPorTareaEstudiante, match} =this.props
        console.log("2021 PROPS: ",this.props)
        // Obtenemos el idTarea
        const idTarea = match.params.id;
    
        // Obtenemos la url actual
        const url = match.url;

        if(idTarea){
            // El esta inicial va a ser false ya que no se esta creando 
            this.setState({creacion: false});
            // llamamos a la funcion
            leerPorTareaEstudiante(idTarea);
        }  
    }

    // Funcion para actualizar archivo
    setArchivo = (archivo) =>{
        this.setState({archivo});
    }


    // Funcion para editar
    editar = (data) => {
        const {calificarTarea, match}= this.props;
        //const id = match.params.id
        calificarTarea(data)
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
        const idTarea = match.params.id;

        return(
            <Fragment>
                <FormularioCalificarTarea 
                    creacion={creacion}
                    onSubmit={funcionEnvio}
                    setArchivo={this.setArchivo}
                    documento_adjuntar={documento_adjuntar}
                    limpiarArchivo={limpiarArchivo}
                    idAsignacion={idAsignacion}
                    idTarea={idTarea}
                />
            </Fragment>
        );
    }
}
export default CalificarTareaCrear;