// Importar el modulo de react
import React, {Component, Fragment} from 'react';
// Importar el componente Formulario para renderizarlo
import Formulario from './Formulario';


/**
 * CREAR COMPONENTE TareaEstudianteCrear
 */
class TareaEstudianteCrear extends Component{

    state={
        creacion: true,
        archivo: null,
    }

    // Funcion que se ejecutar antes de renderizar el componente
    componentWillMount = () =>{
        // Obtener la funcion propia ListarCursosAsignados
        const {listarCursosAsignados} = this.props;
        // Llamar la funcion propia 
        listarCursosAsignados();
    }

    // Funcion para actualizar archivo
    setArchivo = (archivo) =>{
        this.setState({archivo});
    }

    // Funcion para registrar tarea
    // En datos: viene la informacion para registrar tarea del estudiante ed decir (descripcion, documento_adjuntar)
    registro = (datos) =>{
        const {registrarTareaEstudiante, match, data}= this.props;
        const idTarea = match.params.id
        //const idEstudiante = match.params.id;
        // En data: viene la informacion del usuario autenticado
        const idEstudiante = data.results['0'].estudiante.id;
        //console.log("mi id estudiante: ", idEstudiante)
        registrarTareaEstudiante(idTarea, idEstudiante, datos, [{file: this.state.archivo, name: 'archivo'},])
    }


    render(){
        // Obtenemos registro
        const {documento_adjuntar, limpiarArchivo, match, data} = this.props;
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
                idAsignacion={idAsignacion}
                />
            </Fragment>
            
        );
    }
}
export default TareaEstudianteCrear;