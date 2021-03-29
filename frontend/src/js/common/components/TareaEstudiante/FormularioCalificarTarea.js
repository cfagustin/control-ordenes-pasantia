import React,{Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import { api } from "../../../utility/api";


// Importar el renderField
import {
    renderDatePicker,
    renderField,
    renderFilePicker,
    renderTextArea,
} from '../Utils/renderField/renderField';


/**
 * COMPONENTE Formulario
 */
class FormularioCalificarTarea extends Component{

    
    // El metodo componentWillUnmount se va ejecutar cuando se destruya o salga 
    componentWillUnmount =()=>{
        const {limpiarArchivo} = this.props;
        limpiarArchivo();
    }


    render(){

        // Obtenemos el setArchivo
        const {setArchivo, handleSubmit, creacion, documento_adjuntar, idAsignacion, idTarea} = this.props;
        // Obtener la url
        //const editar = window.location.href.includes('editar');
        //
        let disabled = true;
        //let titulo = editar ? 'Editar Tarea' : 'Registrar Tarea';

        // Validamos si no se esta creando ni editando 
        //if(creacion == false && editar == false){
        //    disabled = true;
        //    titulo = 'Ver Tarea'
        //}
        // Se obtuvo idAsignacion que se envia desde el TareaCrear
        const url = `/#/tarea/${idAsignacion}/listado-tareas/${idTarea}`

        
        return(
            <form onSubmit={handleSubmit}>
                <h3>Registrar Calificación</h3>

                <div className="row">
                    <div className="col-lg-4">
                        <label htmlFor="">Fecha Entrega</label>
                        <Field 
                            name="fecha_entrega"
                            component={renderField}
                            disabled={disabled}
                        />
                    </div>
                    <div className="col-lg-2">
                        <label htmlFor="">CALIFICACIÓN</label>
                        <Field 
                            name="calificacion"
                            component={renderField}
                            placeholder="Ingrese calificación"
                            
                        />
                    </div>
                </div>
                <br/>
                
                <div className="row">
                    <div className="col-lg-6">
                        <label htmlFor="">Descripción</label>
                        <Field 
                            name="descripcion"
                            component={renderTextArea}
                            disabled={disabled}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6">
                        <label htmlFor="">Archivo</label>
                        <Field 
                            accept="image/*,.pdf, document/*"
                            name="documento_adjuntar"
                            setFile={setArchivo}
                            photo={documento_adjuntar}
                            component={renderFilePicker}
                            disabled={disabled}
                        />
                        
                        <a href={documento_adjuntar}>Descargar Documento</a>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6">
                        <div className="d-flex flex-row justify-content-end mt-2">
                            <button type="submit" className='btn btn-success'>Calificar</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
export default reduxForm({
    form: 'tareaestudianteForm'
})(FormularioCalificarTarea)