const axios = require('axios');
const { obtenerNumeroDesdeURL } = require('../helpers/helpers')

const getPokemonList = async (req, res) => {
  try {
    
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon');

    const pokemonList = response.data.results;

    const arr = pokemonList.map(e => ({...e, id: obtenerNumeroDesdeURL(e.url)}))

    res.json({ data: arr });

  } catch (err) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ message: 'Error al obtener la lista de Pokémon' });
    } else {
      res.status(500).json({ message: 'Error al obtener la lista de Pokémon' });
    }
  }
};

const getPokemonByName = async (req, res) => {
  try {

    const { namePoke } = req.params;

    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${String(namePoke).toLowerCase()}`);

    const { abilities, name, types, forms } = response.data;

    res.json({ abilities, name, types, forms });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ message: 'Pokémon no encontrado' });
    } else {
      res.status(500).json({ message: 'Error al obtener información del Pokémon' });
    }
  }
};

const getPokemonByType = async (req, res) => {
  try {
    const { type } = req.params;

    const response = await axios.get(`https://pokeapi.co/api/v2/type/${String(type).toLowerCase()}`);

    const { pokemon } = response.data

    const resPoke = pokemon.map(e => ({ name: e.pokemon.name, url: e.pokemon.url, id: obtenerNumeroDesdeURL(e.pokemon.url) }));

    res.json(resPoke);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ message: 'Tipo de Pokémon no encontrado' });
    } else {
      res.status(500).json({ message: 'Error al obtener el Tipo Pokémon' });
    }
  }
};

const getPokemonDetail = async (req, res) => {
  try {

    const { pokeNumber } = req.params;
    
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeNumber}`);

    const { id, abilities, name, types, height, weight, species } = response.data;

    res.json({ id, abilities, name, types, height, weight, species });
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