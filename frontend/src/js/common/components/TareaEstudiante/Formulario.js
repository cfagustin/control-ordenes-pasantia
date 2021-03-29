// Importar el modulo de react
import React, {Component} from 'react';
// Importar el modulo de redux-form
import {Field, reduxForm} from 'redux-form';


// Importar renderField
import {
    renderTextArea,
    renderFilePicker,
}
from '../Utils/renderField/renderField'



/**
 * CREAR COMPONENTE Formulario
 */
class Formulario extends Component{
    
    render(){
        // Obtenemos la funcion propia que nos envia (TareaEstudianteCrear)
        const {setArchivo, handleSubmit, creacion, documento_adjuntar, idAsignacion} = this.props;
        console.log("mi id enviado asignacion: ", idAsignacion)
        const url = `/#/tareaestudiante/${idAsignacion}/listar`;


        return(
            <form onSubmit={handleSubmit}>
                <h2>Registrar Tarea</h2>
                <div className="row">
                    <div className="col-lg-6">
                        <label htmlFor="">Descripcion</label>
                        <Field 
                        name="descripcion"
                        component={renderTextArea}
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
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6">
                        <div className="d-flex flex-row justify-content-end mt-2">
                            <a href={url} className="btn btn-secondary btn-sm mr-2">Cancelar</a>
                            
                            <button type="submit" className='btn btn-primary'>registrar</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
// Utilizar reduxForm
export default reduxForm({
    form: 'tareaestudianteForm' //Nombre unico de nuestro formulario
})(Formulario);
