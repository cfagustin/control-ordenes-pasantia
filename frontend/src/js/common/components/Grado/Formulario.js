import { identity } from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { api } from "../../../utility/api";


// Importar el renderField
import {
    renderField,
    AsyncSelectField,
} from "../Utils/renderField/renderField";


const getNiveles = (search) => {
    let Niveles = [];
    return api
        .get("nivel", { search })
        .then((response) => {
	    Niveles = response.results.map((nivel) => ({
                value: parseInt(nivel.id),
                label: nivel.nombre_nivel,
            }));
            return Niveles;
        })
        .catch((err) => {
            return Niveles;
        });
};


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
        let titulo = editar ? 'Editar Grado' : 'Registrar Grado';

        // Validamos si no se esta creando ni editando 
        if(creacion == false && editar == false){
            disabled = true;
            titulo = 'Ver Grado'
        }

        return(
            <form onSubmit={handleSubmit} className="w-50">
                <h3 className="mt-3">{titulo}</h3>
                <label htmlFor="">Grado</label>
                <Field name="nombre_grado" component={renderField} disabled={disabled}/>

                <br/>
                <label htmlFor="async_select_field">Nivel</label>
                    <Field
                        name="nivel"
                        loadOptions={getNiveles}
                        component={AsyncSelectField}
                        disabled={disabled}
                    />
                
                <div className="d-flex flex-row justify-content-end mt-2">
                    <a href="/#/grado" className="btn btn-secondary btn-sm mr-2">Cancelar</a>
                    
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
    form: 'gradoForm' // Identificar unico del formulario
  })(Formulario) // Nombre del componente