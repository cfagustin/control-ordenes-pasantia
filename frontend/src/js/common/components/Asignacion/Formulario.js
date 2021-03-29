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


const getCiclos = (search) => {
    let ciclos = [];
    return api
        .get("ciclo", { search })
        .then((response) => {
	    ciclos = response.results.map((ciclo) => ({
                value: parseInt(ciclo.id),
                label: ciclo.ciclo_escolar,
            }));
            return ciclos;
        })
        .catch((err) => {
            return ciclos;
        });
};

const getGrados = (search) => {
    let grados = [];
    return api
        .get("grado", { search })
        .then((response) => {
	    grados = response.results.map((grado) => ({
                value: parseInt(grado.id),
                label: grado.nombre_grado,
            }));
            return grados;
        })
        .catch((err) => {
            return grados;
        });
};

const getSecciones = (search) => {
    let secciones = [];
    return api
        .get("seccion", { search })
        .then((response) => {
	    secciones = response.results.map((seccion) => ({
                value: parseInt(seccion.id),
                label: seccion.nombre_seccion,
            }));
            return secciones;
        })
        .catch((err) => {
            return secciones;
        });
};


const getCursos= (search) => {
    let cursos = [];
    return api
        .get("curso", { search })
        .then((response) => {
	    cursos = response.results.map((curso) => ({
                value: parseInt(curso.id),
                label: curso.nombre_curso,
            }));
            return cursos;
        })
        .catch((err) => {
            return cursos;
        });
};

const getCatedraticos= (search) => {
    let catedraticos = [];
    return api
        .get("catedratico", { search })
        .then((response) => {
	    catedraticos = response.results.map((catedratico) => ({
                value: parseInt(catedratico.id),
                label: catedratico.profile.nombre +' '+catedratico.profile.apellidos,
            }));
            return catedraticos;
        })
        .catch((err) => {
            return catedraticos;
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
        let titulo = editar ? 'Editar Asignación' : 'Registrar Asignación';

        // Validamos si no se esta creando ni editando 
        if(creacion == false && editar == false){
            disabled = true;
            titulo = 'Ver Asignación'
        }
      
        return(
            <Fragment>
                <form className="w-100x" onSubmit={handleSubmit}>
                    <h4 className="mt-1">{titulo}</h4>
                    <div className="row">
                        
                        <div className="col-lg-4">
                            <label htmlFor="">Imagen Portada</label>
                            <Field 
                                name="imagen_portada" 
                                component={renderFilePicker} 
                                disabled={disabled}
                            />
                        </div> 

                        <div className="col-lg-8">
                            <label htmlFor="">Descripción</label>
                            <Field 
                                name="descripcion" 
                                placeholder="Ingresar descripción"
                                component={renderField} 
                                disabled={disabled}
                            />
                        </div>  
                    </div>
                   
                    <br/>
                    <div className="row">
                        <div className="col-lg-2">
                            <label htmlFor="async_select_field">Ciclo</label>
                                <Field
                                    name="ciclo"
                                    loadOptions={getCiclos}
                                    component={AsyncSelectField}
                                    disabled={disabled}
                                />
                        </div>

                        <div className="col-lg-6">
                            <label htmlFor="async_select_field">Grado</label>
                                <Field
                                    name="grado"
                                    loadOptions={getGrados}
                                    component={AsyncSelectField}
                                    disabled={disabled}
                                />
                        </div>

                        <div className="col-lg-4">
                            <label htmlFor="async_select_field">Sección</label>
                                <Field
                                    name="seccion"
                                    loadOptions={getSecciones}
                                    component={AsyncSelectField}
                                    disabled={disabled}
                                />
                        </div>
                    </div>

                    <br/>
                    <div className="row">
                        <div className="col-lg-6">
                            <label htmlFor="async_select_field">Curso</label>
                                <Field
                                    name="curso"
                                    loadOptions={getCursos}
                                    component={AsyncSelectField}
                                    disabled={disabled}
                                />
                        </div>

                        <div className="col-lg-6">
                            <label htmlFor="async_select_field">Catedratico</label>
                                <Field
                                    name="catedratico"
                                    loadOptions={getCatedraticos}
                                    component={AsyncSelectField}
                                    disabled={disabled}
                                />
                        </div>
                    </div>

                    <br/>
                    <div className="d-flex flex-row justify-content-end mb-4">
                        <a href="/#/asignacion" className="btn btn-secondary btn-sm mr-2">Cancelar</a>
                            
                        {disabled == false &&
                            <button type="submit" className={`btn btn-sm ${editar ? 'btn-success' : 'btn-primary'}`} >{editar ? 'Editar' : 'Registrar'}</button>
                        }
                    </div>
                </form>
            </Fragment>
        )
    }
}
// Decorador con reduxForm
export default reduxForm({
    form: 'asignacionForm' // Identificar unico del formulario
  })(Formulario) // Nombre del componente