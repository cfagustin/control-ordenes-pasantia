import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";




const CATEDRATICO = 'CATEDRATICO';
const USUARIO = 'USUARIO';
const ESTUDIANTE = 'ESTUDIANTE';
const GRADO = 'GRADO';
const SECCION = 'SECCION';
const MISCUROS = 'MISCURSOS';
const TAREASPENDIENTES = 'TAREASPENDIENTES';
const TAREASPENDIENTESPORCURSO = 'TAREASPENDIENTESPORCURSO';
const MISCURSOSESTUDIANTE = 'MISCURSOSESTUDIANTE';
const MISPROXIMASTAREAS =  'MISPROXIMASTAREAS';

export const setCatedratico = catedratico => ({
   type: CATEDRATICO,
   catedratico,
});

export const setUsuarios = usuario => ({
    type: USUARIO,
    usuario,
 });
 
export const setEstudiantes = estudiante => ({
    type: ESTUDIANTE,
    estudiante,
});
 
export const setGrados = grado => ({
    type: GRADO,
    grado,
});

export const setSecciones = seccion => ({
    type: SECCION,
    seccion,
});
 
export const setMisCursos = misCursos => ({
    type: MISCUROS,
    misCursos,
});

export const setTareasPendientes = misTareasPendientes => ({
    type: TAREASPENDIENTES,
    misTareasPendientes,
});
 
export const setTareasPendientesPorCurso = misTareasPendientesPorCurso =>({
    type: TAREASPENDIENTESPORCURSO,
    misTareasPendientesPorCurso,
});

export const setMisCursosEstudiante = misCursosEstudiante => ({
    type: MISCURSOSESTUDIANTE,
    misCursosEstudiante,
});

export const setMisProximasTareas = misProximasTareas => ({
    type: MISPROXIMASTAREAS,
    misProximasTareas,
});


/**
 * FUNCION PROPIA LISTAR TOTAL CATEDRATICOS
 */
export const listarTotalCatedraticos =()=>(dispatch) =>{
    // Llamar a traves del api al metodo get
    api.get('/catedratico/totalCatedraticos').then((response) =>{
        dispatch(setCatedratico(response))
    }).catch((error) =>{
    }).finally(()=>{
    });
}

/**
 * FUNCION PROPIA LISTAR TOTAL CATEDRATICOS
 */
 export const listarTotalUsuarios =()=>(dispatch) =>{
    // Llamar a traves del api al metodo get
    api.get('/catedratico/totalUsuarios').then((response) =>{
        dispatch(setUsuarios(response))
    }).catch((error) =>{
    }).finally(()=>{
    });
}

/**
 * FUNCION PROPIA LISTAR TOTAL ESTUDIANTES
 */
 export const listarTotalEstudiantes =()=>(dispatch) =>{
    // Llamar a traves del api al metodo get
    api.get('/estudiantes/totalEstudiantes').then((response) =>{
        dispatch(setEstudiantes(response))
    }).catch((error) =>{
    }).finally(()=>{
    });
}

/**
 * FUNCION PROPIA LISTAR TOTAL GRADOS
 */
 export const listarTotalGrados =()=>(dispatch) =>{
    // Llamar a traves del api al metodo get
    api.get('/grado/totalGrados').then((response) =>{
        dispatch(setGrados(response))
    }).catch((error) =>{
    }).finally(()=>{
    });
}

/**
 * FUNCION PROPIA LISTAR TOTAL SECCIONES
 */
 export const listarTotalSecciones =()=>(dispatch) =>{
    // Llamar a traves del api al metodo get
    api.get('/seccion/totalSecciones').then((response) =>{
        dispatch(setSecciones(response))
    }).catch((error) =>{
    }).finally(()=>{
    });
}

/**
 * FUNCION PROPIA PARA LISTAR CURSOS ASIGNADOS CATEDRATICO
 */
export const listarCursosAsignados = () => (dispatch) =>{

    api.get('/asignacionestudiante/listarCursos').then((response) => {
        const misCursos={results:response}
        console.log(" Mis cursos: ",misCursos)
        dispatch(setMisCursos(misCursos));
    }).catch((error) => {
    }).finally(() => {
    });
}


export const totalTareasPendientesCalificar = () => (dispatch) =>{
    // Llamar a traves del api al metodo get
    api.get('/tareaestudiante/totalTareasPendientesCalificar').then((response) =>{
        dispatch(setTareasPendientes(response))
    }).catch((error) =>{
    }).finally(()=>{
    });
}

             
export const totalTareasPendientesCalificarPorCurso = () => (dispatch) =>{
    // Llamar a traves del api al metodo get
    api.get('/tareaestudiante/totalTareasPendientesCalificarPorCurso').then((response) =>{
        const misTareasPendientesPorCurso={results:response}
        console.log(" Mis tareas P : ", misTareasPendientesPorCurso)
        dispatch(setTareasPendientesPorCurso(misTareasPendientesPorCurso))
    }).catch((error) =>{
    }).finally(()=>{
    });
}


/**
 * FUNCION PROPIA PARA LISTAR CURSOS ASIGNADOS ESTUDIANTE
 */
export const listarCursosAsignadosEstudiante = () => (dispatch) =>{
    api.get('/tareaestudiante/listarMisCursos').then((response) => {
        const misCursosEstudiante={results:response}
        console.log(" Mis cursos estudiante: ",misCursosEstudiante)
        dispatch(setMisCursosEstudiante(misCursosEstudiante));
    }).catch((error) => {
    }).finally(() => {
    });
}



/**
 * FUNCION PROPIA PARA LISTAR TAREA PROXIMAS A ENTREGAR
 */
export const proximasTareasEntregar = () => (dispatch) =>{
    console.log("entro a proximas")
    // Llamar a traves del api al metodo get
    api.get('/tareaestudiante/proximasTareasEntregar').then((response) =>{
        const misProximasTareas={results:response}
        console.log(" Mis tareas entregar : ", misProximasTareas)
        dispatch(setMisProximasTareas(misProximasTareas))
    }).catch((error) =>{
    }).finally(()=>{
    });
}


// 2 Exportar las acciones
export const actions = {
    //llamada a la accion
    listarTotalCatedraticos,
    listarTotalUsuarios,
    listarTotalEstudiantes,
    listarTotalGrados,
    listarTotalSecciones,
    listarCursosAsignados,
    totalTareasPendientesCalificar,
    totalTareasPendientesCalificarPorCurso,
    listarCursosAsignadosEstudiante,
    proximasTareasEntregar,
};


// 4 Reducer
export const reducers = {
    // 1. Tiene que tener un identificador unico por ello se creo la constante
    // 2. Lo que tiene que alterar o actualizar es (data)
    [CATEDRATICO]: (state, { catedratico }) => {
        return {
            ...state,
            catedratico,
        };
    },
    [USUARIO]: (state, { usuario }) => {
        return {
            ...state,
            usuario,
        };
    },
    [ESTUDIANTE]: (state, { estudiante }) => {
        return {
            ...state,
            estudiante,
        };
    },
    [GRADO]: (state, { grado }) => {
        return {
            ...state,
            grado,
        };
    },
    [SECCION]: (state, { seccion }) => {
        return {
            ...state,
            seccion,
        };
    },
    [MISCUROS]: (state, { misCursos }) => {
        return {
            ...state,
            misCursos,
        };
    },
    [TAREASPENDIENTES]: (state, { misTareasPendientes }) => {
        return {
            ...state,
            misTareasPendientes,
        };
    },
    [TAREASPENDIENTESPORCURSO]: (state, { misTareasPendientesPorCurso }) => {
        return {
            ...state,
            misTareasPendientesPorCurso,
        };
    },
    [MISCURSOSESTUDIANTE]: (state, { misCursosEstudiante }) => {
        return {
            ...state,
            misCursosEstudiante,
        };
    },
    [MISPROXIMASTAREAS]: (state, { misProximasTareas }) => {
        return {
            ...state,
            misProximasTareas,
        };
    },
};

// 3 Estado inicial
export const initialState = {
    loader: false,
    // registro se coloca en null aya que en la funcion leer nos devuelve un (Object)
    catedratico: [],
    usuario: [],
    estudiante: [],
    grado: [],
    seccion: [],
    misCursos: [],
    misTareasPendientes: [],
    misTareasPendientesPorCurso: [],
    misCursosEstudiante: [],
    misProximasTareas: [],
};




export default handleActions(reducers, initialState);