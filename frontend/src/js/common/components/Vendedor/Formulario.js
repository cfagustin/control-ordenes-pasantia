import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { api } from "../../../utility/api";

// Importar el renderField
import {
    SelectField,
    AsyncSelectField,
    renderField,
} from "../Utils/renderField/renderField";



const getRoles = (search) => {
    let roles = [];
    return api
        .get("rol", { search })
        .then((response) => {
	    roles = response.results.map((rol) => ({
                value: parseInt(rol.id),
                label: rol.nombre_rol,
            }));
            return roles;
        })
        .catch((err) => {
            return roles;
        });
};


const MASCULINO = 0
const FEMENIMO = 1

const GENERO = [
    {"label": "MASCULINO", "value": MASCULINO},
    {"label": "FEMENIMO", "value": FEMENIMO},
];




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
        let titulo = editar ? 'Editar Vendedor' : 'Registrar Vendedor';

        // Validamos si no se esta creando ni editando 
        if(creacion == false && editar == false){
            disabled = true;
            titulo = 'Ver Vendedor'
        }

        return(
            <Fragment>
                <form className="w-100x" onSubmit={handleSubmit}>
                    <h4 className="mt-1">{titulo}</h4>
                    <div className="row">
                        <div className="col-lg-4">
                            <label htmlFor="">Email</label>
                            <Field 
                                name="email" 
                                placeholder="Ingresar email"
                                component={renderField}
                                disabled={disabled}
                            />
                        </div>

                        <div className="col-lg-4">
                            <label htmlFor="">Username</label>
                            <Field 
                                name="username" 
                                placeholder="Ingresar usuario"
                                component={renderField} 
                                disabled={disabled}
                            />
                        </div>  
                        
                        <div className="col-lg-4">
                            <label htmlFor="">Password</label>
                            <Field 
                                name="password" 
                                type="password"
                                placeholder="Ingresar password"
                                component={renderField} 
                                disabled={disabled}
                            />
                        </div>
                    </div>
                   
                    <br/>
                    <h4 className="mt-2">Datos Perfil</h4>
                    <div className="row">
                        <div className="col-lg-4">
                            <label htmlFor="">Nombre</label>
                            <Field 
                                name="nombre" 
                                placeholder="Ingresar nombre"
                                component={renderField} 
                                disabled={disabled}
                            />
                        </div>  

                        <div className="col-lg-4">
                            <label htmlFor="">Apellidos</label>
                            <Field 
                                name="apellidos" 
                                placeholder="Ingresar apellidos"
                                component={renderField} 
                                disabled={disabled}
                            />
                        </div>

                        <div className="col-lg-4">
                            <label htmlFor="">Telefono</label>
                            <Field 
                                name="telefono" 
                                placeholder="Ingresar telefono"
                                component={renderField} 
                                disabled={disabled}
                            />
                        </div>
                        
                        <div className="col-lg-4">
                            <label htmlFor="">Direccion</label>
                            <Field 
                                name="direccion" 
                                placeholder="Ingresar dirección"
                                component={renderField} 
                                disabled={disabled}
                            />
                        </div>

                        <div className="col-lg-4">
                            <label htmlFor="select_field">Género</label>
                                <Field
                                    name="gender"
                                    options={GENERO}
                                    component={SelectField}
                                    disabled={disabled}
                                />
                        </div>

                        <div className="col-lg-4">
                            <label htmlFor="async_select_field">Rol</label>
                                <Field
                                    name="rol"
                                    loadOptions={getRoles}
                                    component={AsyncSelectField}
                                    disabled={disabled}
                                />
                        </div>
                    </div>
                    <br/>
                   
                    <div className="d-flex flex-row justify-content-end mt-2">
                        <a href="/#/vendedor" className="btn btn-secondary btn-sm mr-2">Cancelar</a>
                            
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
    form: 'vendedorForm' // Identificar unico del formulario
  })(Formulario) // Nombre del componente