import { useDispatch } from 'react-redux';
import { SET_ERROR } from '@/redux/action';
import useSWR from "swr";
import axios from "axios";

// const dispatch = useDispatch();

const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export const usePokemonList = () => {
  const { data, error, isLoading } = useSWR("http://localhost:3001/pokemon/pokemonList",fetcher);

  if (error) {
    
    // dispatch({ type: SET_ERROR, payload: {state: true, msj: 'Hubo un error al obtener la lista de Pokemon' } });

    return [];
  }

  return { pokemonList: data?.data, error, isLoading };
};

export const usePokemonDetail = (id) => {

  const { data, error, isLoading } = useSWR(id ? `http://localhost:3001/pokemon/detail/${id}` : null,fetcher);

  if (error) {
    
    return { data: null, error, isLoading };
  }

  if (!data) {
    return { data: {}, error, isLoading };
  }

  return { data, error, isLoading };
};

export const usePokemonByName = (name) => {

  const { data, error, isLoading } = useSWR(name ? `http://localhost:3001/pokemon/name/${name}` : null, fetcher);

  if (error) {
    
    return { data: null, error, isLoading };
  }

  if (!data) {
    return { data, error, isLoading };
  }

  return { data, error, isLoading };
};


export const usePokemonByType = (type) => {
  
  const { data, error, isLoading } = useSWR(type ? `http://localhost:3001/pokemon/type/${type}` : null, fetcher);

  if (error) {
    
    return { data: null, error, isLoading };
  }

  if (!data) {
    return { data, error, isLoading };
  }

  return { data, error, isLoading };
};








// import axios from "axios";
// import useSWR from "swr";
// import { obtenerNumeroDesdeURL } from "@/helpers/helpers";

// const fetcher = async (url) => {
//   const response = await axios.get(url);
//   return response.data;
// };

// export const getPokemonList = () => {
//   const { data: pokemonList, error } = useSWR('http://localhost:3001/pokemon/pokemonList', fetcher);

//   if (error) {
//     console.error("Error fetching Pokemon list:", error);
//     return [];
//   }

//   return pokemonList;
// };

// export const getPokemonDetail = (id) => {
//   const { data: pokemonDetail, error } = useSWR(`http://localhost:3001/pokemon/detail/${id}`, fetcher);

//   if (error) {
//     console.error(`Error fetching Pokemon detail for ID ${id}:`, error);
//     return null;
//   }

//   return pokemonDetail;
// };

// export const getPokemonByName = (name) => {
//   const { data: pokemonByName, error } = useSWR(`http://localhost:3001/pokemon/name/${name}`, fetcher);

//   if (error) {
//     console.error(`Error fetching Pokemon by name ${name}:`, error);
//     return null;
//   }

//   return pokemonByName;
// };

// export const getPokemonByType = (type) => {
//   const { data: pokemonByType, error } = useSWR(`http://localhost:3001/pokemon/type/${type}`, fetcher);

//   if (error) {
//     console.error(`Error fetching Pokemon by type ${type}:`, error);
//     return [];
//   }

//   return pokemonByType;
// };





// import axios from "axios";

// export const getPokemonList = async () => {

//     const response = await axios.get('http://localhost:3001/pokemon/pokemonList');

//     const { data } = response.data;

//     const promises = data?.map(async e => {

//         const resDetail = await axios.get(`http://localhost:3001/pokemon/detail/${e.id}`);

//         return resDetail.data.data;
//     });

//     const pokemonList = await Promise?.all(promises);

//     return pokemonList;

// };

// export const getPokemonDetail = async (id) => {
    
//     const response = await axios.get(`http://localhost:3001/pokemon/detail/${id}`);

//     const { data } = response.data;

//     return data

// };

// export const getPokemonByName = async (name) => {
    
//     const response = await axios.get(`http://localhost:3001/pokemon/name/${name}`);

//     const { data } = response.data;

//     return data

// };

// export const getPokemonByType = async (type) => {
    
//     const response = await axios.get(`http://localhost:3001/pokemon/type/${type}`);

//     const { data } = response;

//     return data

// };