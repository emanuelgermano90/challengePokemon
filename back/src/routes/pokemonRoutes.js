
// Rutas con sus controladores y
// los de talles para la descripcion de cada llamada con Swagger.
const express = require('express');
const router = express.Router();
const {

    getPokemonList,
    getPokemonByName,
    getPokemonByType,
    getPokemonDetail,

} = require('../controllers/pokemonController');

/**
 * @swagger
 * tags:
 *   name: Pokémon
 *   description: Operaciones relacionadas con Pokémon
 */

/**
 * @swagger
 * /pokemon/pokemonList:
 *   get:
 *     summary: Obtener la lista de todos los Pokémon
 *     tags: [Pokémon]
 *     responses:
 *       200:
 *         description: Lista de Pokémon obtenida exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.get('/pokemonList', getPokemonList);

/**
 * @swagger
 * /pokemon/name/{namePoke}:
 *   get:
 *     summary: Obtener información de un Pokémon por su nombre
 *     tags: [Pokémon]
 *     parameters:
 *       - in: path
 *         name: namePoke
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del Pokémon a buscar
 *     responses:
 *       200:
 *         description: Información del Pokémon encontrada
 *       404:
 *         description: Pokémon no encontrado
 */
router.get('/name/:namePoke', getPokemonByName);

/**
 * @swagger
 * /pokemon/type/{type}:
 *   get:
 *     summary: Obtener Pokémon por tipo
 *     description: Obtiene una lista de Pokémon que pertenecen a un tipo específico.
 *     tags: [Pokémon]
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: Tipo de Pokémon a buscar. Puede ser "fire", "water", "grass", etc.
 *     responses:
 *       200:
 *         description: Lista de Pokémon del tipo especificado
 *       404:
 *         description: No se encontraron Pokémon de ese tipo
 */
router.get('/type/:type', getPokemonByType);

/**
 * @swagger
 * /pokemon/detail/{pokeNumber}:
 *   get:
 *     summary: Obtener detalle de un Pokémon por su ID
 *     tags: [Pokémon]
 *     parameters:
 *       - in: path
 *         name: pokeNumber
 *         schema:
 *           type: integer
 *         required: true
 *         description: Id del Pokémon a buscar
 *     responses:
 *       200:
 *         description: Detalle del Pokémon encontrado
 *       404:
 *         description: Pokémon no encontrado
 */
router.get('/detail/:pokeNumber', getPokemonDetail);

module.exports = router;


