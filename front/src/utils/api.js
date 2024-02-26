
// importamos SWR para el llamado al Back y axios para el fetcher del mismo.
import useSWR from "swr";
import axios from "axios";

// Api Page, la cual utilizamos para las llamadas a nuestro Back End.

// Fetcher para el uso de las llamadas con SWR
const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

// En esta parte hemos creado Hooks para las consultas y datos.

// Hook para la obtencion de la lista de Pokemon.
export const usePokemonList = () => {
  const { data, error, isLoading } = useSWR("http://localhost:3001/pokemon/pokemonList",fetcher);

  if (error) {

    return { pokemonList: data?.data, error, isLoading };
  }
  
  return { pokemonList: data?.data, error, isLoading };
};

// Hook para la obtencion de detalle de Pokemon.
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

// Hook para la busqueda de Pokemon por nombre.
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

// Hook para la busqueda de Pokemon por tipo.
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