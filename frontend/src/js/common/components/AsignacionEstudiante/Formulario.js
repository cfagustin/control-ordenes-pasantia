import { identity } from 'lodash';
import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { api } from "../../../utility/api";


// Importar el renderField
import {
    SelectField,
    AsyncSelectField,
    renderField,
    renderFilePicker,
    renderNumber,
} from "../Utils/renderField/renderField";


const getEstudiantes= (search) => {
    let estudiantes = [];
    return api
        .get("estudiantes", { search })
        .then((response) => {
	    estudiantes = response.results.map((estudiantes) => ({
                value: parseInt(estudiantes.id),
                label: estudiantes.profile.nombre,
            }));
            return estudiantes;
        })
        .catch((err) => {
            return estudiantes;
        });
};



/**
 * COMPONENTE Formulario
 */
class Formulario extends Component{
    render(){ 
        // Recibimos la funcion (onSubmit) que viene del arhcivo (AsignacionEstudianteCrear)
        // Obtener el estado inicial (creacion) a tra ves del los props
        const {handleSubmit, creacion} = this.props;
        // Obtener la url actual
        const asignar= window.location.href.includes('asignar');
        // Titulo del formulario
        let titulo ='Asignar Estudiantes';

        // Al ejecutar onSubmit={handleSubmit} : LLama a la funcion obtenerIdAsignar
        // que se encuentra en el archivo (AsignacionEstudianteCrear)
        return(
            <Fragment>
                <form className="w-100x" onSubmit={handleSubmit}>
                    <h4 className="mt-1">{titulo}</h4>
                    
                    <div className="row">
                        <div className="col-lg-6">
                            <label htmlFor="async_select_field"></label>
                                <Field
                                    name="estudiante"
                                    loadOptions={getEstudiantes}
                                    component={AsyncSelectField}
                                />
                        </div>
                    </div>

                    <br/>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="d-flex flex-row justify-content-end mb-4">
                                <a href="/#/asignacionestudiante" className="btn btn-secondary btn-sm mr-2">Regresar</a>
                            
                                <button type="submit" className={'btn btn-primary'} >Asignar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </Fragment>
        )
    }
}
// Decorador con reduxForm
export default reduxForm({
    form: 'asignacionestudianteForm' // Identificar unico del formulario
  })(Formulario) // Nombre del componente