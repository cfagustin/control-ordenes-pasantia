import React, { Component, Fragment } from 'react';
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
        let titulo = editar ? 'Editar Producto' : 'Registrar Producto';

        // Validamos si no se esta creando ni editando 
        if(creacion == false && editar == false){
            disabled = true;
            titulo = 'Ver Producto'
        }

        return(
            <Fragment>
                <form className="w-100x" onSubmit={handleSubmit}>
                    <h4 className="mt-1">{titulo}</h4>
                    <div className="row">
                        <div className="col-lg-4">
                            <label htmlFor="">Nombre Producto</label>
                            <Field 
                                name="nombre_producto" 
                                placeholder="Ingresar producto"
                                component={renderField}
                                disabled={disabled}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <label htmlFor="">Precio Compra</label>
                            <Field 
                                name="precio_compra" 
                                placeholder="Ingresar precio compra"
                                component={renderField} 
                                disabled={disabled}
                            />
                        </div>  
                    </div>

                    <div className="row">
                        <div className="col-lg-4">
                            <label htmlFor="">Precio Venta</label>
                            <Field 
                                name="precio_venta" 
                                placeholder="Ingresar precio venta"
                                component={renderField} 
                                disabled={disabled}
                            />
                        </div>  
                    </div>

                    <div className="row">
                        <div className="col-lg-4">
                            <div className="d-flex flex-row justify-content-end mt-2">
                                <a href="/#/producto" className="btn btn-secondary btn-sm mr-2">Cancelar</a>
                                    
                                {disabled == false &&
                                    <button type="submit" className={`btn btn-sm ${editar ? 'btn-success' : 'btn-primary'}`} >{editar ? 'Editar' : 'Registrar'}</button>
                                }
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