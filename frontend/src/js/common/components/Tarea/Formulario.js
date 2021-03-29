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
class Formulario extends Component{

    
    // El metodo componentWillUnmount se va ejecutar cuando se destruya o salga 
    componentWillUnmount =()=>{
        const {limpiarArchivo} = this.props;
        limpiarArchivo();
    }


    render(){

        // Obtenemos el setArchivo
        const {setArchivo, handleSubmit, creacion, documento_adjuntar, idAsignacion} = this.props;
        // Obtener la url
        const editar = window.location.href.includes('editar');
        //
        let disabled = false;
        let titulo = editar ? 'Editar Tarea' : 'Registrar Tarea';

        // Validamos si no se esta creando ni editando 
        if(creacion == false && editar == false){
            disabled = true;
            titulo = 'Ver Tarea'
        }

        // Se obtuvo idAsignacion que se envia desde el TareaCrear
        const url = `/#/tarea/${idAsignacion}/listar`

        
        return(
            <form onSubmit={handleSubmit}>
                <h3>{titulo}</h3>

                <div className="row">
                    <div className="col-lg-2">
                        <label htmlFor="">Fecha Entrega</label>
                        <Field 
                            name="fecha_entrega"
                            component={renderDatePicker}
                            disabled={disabled}
                        />
                    </div>

                    <div className="col-lg-2">
                        <label htmlFor="">Hora Entrega</label>
                        <Field 
                            name="hora_entrega"
                            component={renderField}
                            disabled={disabled}
                            type='time'
                        />

                    </div>

                    <div className="col-lg-2">
                        <label htmlFor="">Nota</label>
                        <Field 
                            name="nota"
                            component={renderField}
                            disabled={disabled}
                        />
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-lg-6">
                        <label htmlFor="">Titulo</label>
                        <Field 
                            name="titulo_tarea"
                            component={renderField}
                            disabled={disabled}
                        />
                    </div>
                </div>
                
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
                            {disabled == true || editar == true ?
                                <a href={url} className="btn btn-secondary btn-sm mr-2">Cancelar</a>:
                                <a href="/#/asignacionestudiante" className="btn btn-secondary btn-sm mr-2">Cancelar</a>
                            }
                
                            {disabled == false &&
                                <button type="submit" className={`btn btn-sm ${editar ? 'btn-success' : 'btn-primary'}`} >{editar ? 'Editar' : 'Registrar'}</button>
                            }
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
export default reduxForm({
    form: 'tareaForm'
})(Formulario)