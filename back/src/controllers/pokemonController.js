
// Aqui Creamos y Exportamos los controladores para cada servicio de nuestra Api.
// Veran que no todos los controladores tiene todos los comentarios ya que
// muchas funcionalidades de la misma son parecidas obteniendo casi el mismo resultado.
const axios = require('axios');
const { obtenerNumeroDesdeURL } = require('../helpers/helpers')

// Controlador para el listado de los pokemon.
const getPokemonList = async (req, res) => {
  try {
    
    // Hacemos la consulta correspondiente lara la obtencion de lista de pokemon.
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon');

    const pokemonList = response.data.results;

    // Despues de obtener los resultados en esta parte mapeamos el mismo
    // para poder obtener el link de cada pokemon el cual utilizamos para
    // obtener el ID del mismo y enviarlo en la consulta.
    const arr = pokemonList.map(e => ({...e, id: obtenerNumeroDesdeURL(e.url)}))
    
    // Usamos Promise.all para esperar a que todas las promesas se resuelvan
    const promises = arr.map(async e => {

      // Aqui obtenemos el detalle del pokemon.
      const resDetail = await axios.get(`${e.url}`);

      const { abilities, forms } = resDetail.data;
      
      // Del detalle del pokemon obtenemos otro link del Forms,
      // para poder llegar a un PNG (url) del pokemon.
      const formsDetail = await axios.get(`${forms[0].url}`);
      const { sprites } = formsDetail.data;

      const urlFrontPng = sprites?.front_default;

      // Incluimos los datos en el objeto y lo retornamos
      return { ...e, abilities, forms, urlFrontPng }; 
    });

    // Ahora esperamos a que todas las promesas se resuelvan
    const results = await Promise.all(promises);

    // Mapeamos los resultados a cada elemento de arr
    arr.forEach((item, index) => {
      item.abilities = results[index].abilities;
      item.forms = results[index].forms;
      item.urlFrontPng = results[index].urlFrontPng;
    });
    
    // y finalmente creamos el objeto con las propiedades necesarias.
    res.json({ data: arr });

  } catch (err) {

    if (err.response && err.response.status === 404) {

      res.status(404).json({ message: 'Error al obtener la lista de Pokémon' });

    } else {

      res.status(500).json({ message: 'Error al obtener la lista de Pokémon' });

    }
  }
};

// Controlador para la busqueda del pokemon por nombre.
const getPokemonByName = async (req, res) => {
  try {

    // obtenemos el parametro.
    const { namePoke } = req.params;

    // Hacemos la consulta necesaria
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${String(namePoke).toLowerCase()}`);

    // como en todos los controladors hacemos un destructuring 
    // para obtener las propiedades necesarias de cada consulta.
    const { abilities, name, types, forms, species } = response.data;

    const { url } = forms[0];

    const resForms = await axios.get(`${url}`);

    const { sprites } = resForms?.data;

    const urlSpacies = species.url;
    
    // finalmente enviamos el objeto con las propiedades necesarias.
    res.json({ id: obtenerNumeroDesdeURL(urlSpacies), abilities, name, types, forms, urlFrontPng: sprites.front_default });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ message: 'Pokémon no encontrado' });
    } else {
      res.status(500).json({ message: 'Error al obtener información del Pokémon' });
    }
  }
};

// Controlador para la busqueda del pokemon por tipo.
const getPokemonByType = async (req, res) => {
  try {
    
    // obtenemos el parametro.
    const { type } = req.params;

    // Hacemos la consulta necesaria
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${String(type).toLowerCase()}`);

    const { pokemon } = response.data

    const resPoke = pokemon.map(e => ({ name: e.pokemon.name, url: e.pokemon.url, id: obtenerNumeroDesdeURL(e.pokemon.url) }));

    // Usamos Promise.all para esperar a que todas las promesas se resuelvan
    const promises = resPoke.map(async e => {
      const resDetail = await axios.get(`${e.url}`);
      const { abilities, forms } = resDetail.data;
      
      const formsDetail = await axios.get(`${forms[0].url}`);
      const { sprites } = formsDetail.data;

      const urlFrontPng = sprites?.front_default;

      return { ...e, abilities, forms, urlFrontPng }; // Incluimos urlFrontPng en el objeto retornado
    });

    // Ahora esperamos a que todas las promesas se resuelvan
    const results = await Promise.all(promises);

    // Mapeamos los resultados a cada elemento de arr
    resPoke.forEach((item, index) => {
      item.abilities = results[index].abilities;
      item.forms = results[index].forms;
      item.urlFrontPng = results[index].urlFrontPng;
    });

    res.json(resPoke);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ message: 'Tipo de Pokémon no encontrado' });
    } else {
      res.status(500).json({ message: 'Error al obtener el Tipo Pokémon' });
    }
  }
};

// Controlador para la busqueda del pokemon por tipo.
const getPokemonDetail = async (req, res) => {
  try {

    const { pokeNumber } = req.params;
    
    // Hacemos la consulta necesaria
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeNumber}`);

    const { id, abilities, name, types, height, weight, species, forms } = response.data;

    const { url } = forms[0];

    const resForms = await axios.get(`${url}`);

    const { sprites } = resForms?.data;
    
    res.json({ id, abilities, name, types, height, weight, species, urlPng: sprites?.front_default });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ message: 'Pokémon no encontrado' });
    } else {
      res.status(500).json({ message: 'Error al obtener información del Pokémon' });
    }
  }
};


module.exports = {

  getPokemonList,
  getPokemonByName,
  getPokemonByType,
  getPokemonDetail,

}