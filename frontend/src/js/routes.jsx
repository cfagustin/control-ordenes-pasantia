import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import {Login, Profile, Registro} from './common/components/LoginRegister';
import Demo from './common/components/Demo/Demo';
import ProtectedRoute from './ProtectedRoute';
import Examples from './common/components/Examples/Basic';
import NotFound from './common/components/layout/NotFound/NotFound';

import '../assets/fonts/fonts.css';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
import 'bootstrap/dist/css/bootstrap.min.css';
import Grids from "./common/components/Examples/Grids";
import Notificaciones from './common/components/Examples/Notificaciones';
import ExampleTabs from './common/components/Examples/Tabs/Tabs';
require('../style/index.css');

// Importar los componentes Rol
import RolCrearContainer from './common/components/Rol/RolCrearContainer';
import RolListarContainer from './common/components/Rol/RolListContainer';

// Importar los componentes Vendedor
import VendedorCrearContainer from './common/components/Vendedor/VendedorCrearContainer';
import VendedorListarContainer from './common/components/Vendedor/VendedorListContainer';

// Importar los componentes Producto
import ProductoCrearContainer from './common/components/Producto/ProductoCrearContainer'; 
import ProductoListarContainer from './common/components/Producto/ProductoListContainer';

// Importar los componentes Compra
import CompraCrearContainer from './common/components/Compra/CompraCrearContainer'; 
import CompraListarContainer from './common/components/Compra/CompraListContainer';

//
import DashboardVendedor from './common/components/Dashboard/DashboardVendedorContainer';
import DashboardVendedorContainer from './common/components/Dashboard/DashboardVendedorContainer';


module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registro" component={Registro} />
                <Route exact path="/compra" component={CompraListarContainer} />
                <Route exact path="/compra/:id/agregar" component={CompraCrearContainer} />

                <ProtectedRoute exact path="/" component={Demo} />
                <ProtectedRoute exact path="/page2" component={Examples} />
                <ProtectedRoute exact path="/user-profile" component={Profile} />
                <ProtectedRoute exact path="/grids" component={Grids} />
                <ProtectedRoute exact path="/notifications" component={Notificaciones} />
                <ProtectedRoute exact path="/tabs" component={ExampleTabs} />
                <ProtectedRoute exact path="/dashboard-vendedor" component={DashboardVendedorContainer} />

                <ProtectedRoute exact path="/rol/registro" component={RolCrearContainer} />
                <ProtectedRoute exact path="/rol" component={RolListarContainer} />
                <ProtectedRoute exact path="/rol/:id" component={RolCrearContainer} />
                <ProtectedRoute exact path="/rol/:id/editar" component={RolCrearContainer} />

                <ProtectedRoute exact path="/vendedor/registro" component={VendedorCrearContainer} />
                <ProtectedRoute exact path="/vendedor" component={VendedorListarContainer} />
                <ProtectedRoute exact path="/vendedor/:id" component={VendedorCrearContainer} />
                <ProtectedRoute exact path="/vendedor/:id/editar" component={VendedorCrearContainer} />

                <ProtectedRoute exact path="/producto/registro" component={ProductoCrearContainer} />
                <ProtectedRoute exact path="/producto" component={ProductoListarContainer} />
                <ProtectedRoute exact path="/producto/:id" component={ProductoCrearContainer} />
                <ProtectedRoute exact path="/producto/:id/editar" component={ProductoCrearContainer} />
                

                <ProtectedRoute exact path="/compra/registro" component={CompraCrearContainer} />
                <ProtectedRoute exact path="/compra" component={CompraListarContainer} />
                <ProtectedRoute exact path="/compra/:id" component={CompraCrearContainer} />
                <ProtectedRoute exact path="/compra/:id/agregar" component={CompraCrearContainer} />
                

                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
