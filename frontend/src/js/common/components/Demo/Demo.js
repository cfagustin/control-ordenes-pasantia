import React, { Component } from 'react';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';


class Demo extends Component {

  

    render() {
        const {user} = this.props
       
        let info;
        if (user.is_superuser){
            info = <h1 style={{color:'black'}}>Bienvenido: <br/> <span style={{color:'gray', fontSize:'35px'}} >{user.username} <br/> {"Administrador"} </span></h1>
        }else{
            info = <h1 style={{color:'black'}}>Bienvenido: <br/> <span style={{color:'gray', fontSize:'35px'}} >{user.profile.nombre +" "+ user.profile.apellidos} <br/> {user.profile.rol.nombre_rol} </span></h1>
        }


        return (
            <center>
                <br/><br/><br/><br/><br/><br/>
                {info}
            </center>  
          
        );
    }
}
export default Demo;
