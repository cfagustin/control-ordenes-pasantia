import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { api } from "../../../utility/api";
import {Select} from 'react-select';

// Importar el renderField
import {
    renderField,
} from "../Utils/renderField/renderField";


/**
 * COMPONENTE Formulario
 */
class Formulario extends Component{
    
    
    render(){ 
        // Recibimos la funcion (onSubmit) que viene del arhcivo (AsignacionEstudianteCrear)
        // Obtener el estado inicial (creacion) a tra ves del los props
        const {handleSubmit, creacion} = this.props;
        // Obtener la url actual
        const agregar= window.location.href.includes('agregar');

        let disabled = true;
        // Titulo del formulario
        let titulo ='Agregar Productos';
        
        return(
            <Fragment>
                <form className="w-100x" onSubmit={handleSubmit}>
                    <h4 className="mt-1">{titulo}</h4>

                    
                    <div className="row">
                        <div className="col-lg-4">
                            <label htmlFor="">Nombre Producto</label>
                            <Field 
                                name="nombre_producto" 
                                component={renderField} 
                                disabled={disabled}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-4">
                            <label htmlFor="">Cantidad</label>
                            <Field 
                                name="cantidad" 
                                placeholder="Ingresar cantidad"
                                component={renderField} 
                            />
                        </div>  
                    </div>

                    <br/>
                    <div className="row">
                        <div className="col-lg-2">
                            <div className="d-flex flex-row justify-content-end mt-2">
                                <a href="/#/compra" className="btn btn-secondary btn-sm mr-2">Cancelar</a>
                                
                                <button type="submit" className={'btn btn-primary'} >Agregar</button>
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
    form: 'productoForm' // Identificar unico del formulario
  })(Formulario) // Nombre del componente