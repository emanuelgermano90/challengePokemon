
// En esta parte encontraremos la configuracion de nuestro Store.

import { createStore } from 'redux';
import { GET_ALL_POKE, SET_POKE_SEARCH, SET_ERROR, SET_TEME } from './action';

// Inicializamos el estado
const initialState = {
  error: { state: false, msj: '' },
  pokeListG: [],
  pokeSearchG: [],
  bgTheme: { txt: 'Oscuro', state: true },
};

// Definimos el Reducer.
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKE:
      return {
        ...state,
        pokeListG: action.payload
      };
    case SET_POKE_SEARCH:
      return {
        ...state,
        pokeSearchG: action.payload
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SET_TEME:
      return {
        ...state,
        bgTheme: action.payload
      };
    default:
      return state;
  }
};

// Crea nuestro store y lo importamos.
const store = createStore(reducer);

export default store;
