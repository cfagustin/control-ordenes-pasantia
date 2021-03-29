import { identity } from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

// Importar el renderField
import {
    renderField,
} from "../Utils/renderField/renderField";



/**
 * COMPONENTE Formulario
 */
class Formulario extends Component{
    render(){
        // Recibimos la funcion (onSubmit) que viene del arhcivo (RolCrear)
        // Obtener (crear) en los props
        const {handleSubmit, creacion} = this.props;
        // Obtener la url
        const editar = window.location.href.includes('editar');
        //
        let disabled = false;
        let titulo = editar ? 'Editar Profesion' : 'Registrar Profesion';

        // Validamos si no se esta creando ni editando 
        if(creacion == false && editar == false){
            disabled = true;
            titulo = 'Ver Profesion'
        }

        return(
            <form onSubmit={handleSubmit} className="w-50">
                <h3 className="mt-3">{titulo}</h3>
                <label htmlFor="">Nombre Profesion</label>
                <Field name="nombre_profesion" component={renderField} disabled={disabled}/>
                <br/>
                
                <div className="d-flex flex-row justify-content-end mt-2">
                    <a href="/#/profesion" className="btn btn-secondary btn-sm mr-2">Cancelar</a>
                    
                    {disabled == false &&
                        <button type="submit" className={`btn btn-sm ${editar ? 'btn-success' : 'btn-primary'}`} >{editar ? 'Editar' : 'Registrar'}</button>
                    }
                </div>
            </form>
        )
    }
}
// Decorador con reduxForm
export default reduxForm({
    form: 'profesionForm' // Identificar unico del formulario
  })(Formulario) // Nombre del componente
