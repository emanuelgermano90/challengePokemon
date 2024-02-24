
import { SET_ERROR } from "@/redux/action";

export const setErrorF = ( dispatch, msj ) => {
    
    dispatch({ type: SET_ERROR, payload: {state: true, msj } });

    setTimeout(() => {

        dispatch({ type: SET_ERROR, payload: {state: false, msj: `` } });

    }, 3000);

}