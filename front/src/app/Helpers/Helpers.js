
import { SET_ERROR } from "@/redux/action";

// Creamos la seccion de Helpers para reutilizar codigo.

// Funcion que reutilizamos para el envio de errores,
// el mismo maneja el estado de error, 
// envia un mensaje y activa el Allert creado con un temporizador de 3s.
export const setErrorF = ( dispatch, msj ) => {
    
    dispatch({ type: SET_ERROR, payload: {state: true, msj } });

    setTimeout(() => {

        dispatch({ type: SET_ERROR, payload: {state: false, msj: `` } });

    }, 3000);

}