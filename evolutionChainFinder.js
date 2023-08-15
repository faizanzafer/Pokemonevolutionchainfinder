const axios = require("axios");

async function getEvolutionChain(pokemonName) {
  try {
    const pokemonResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const speciesUrl = pokemonResponse.data.species.url;

    const speciesResponse = await axios.get(speciesUrl);
    const evolutionChainUrl = speciesResponse.data.evolution_chain.url;

    const evolutionChainResponse = await axios.get(evolutionChainUrl);
    const evolutionChain = evolutionChainResponse.data.chain;

    return formatEvolutionChain(evolutionChain);
  } catch (error) {
    console.error("Error:", error.message);
    return error.message;
  }
}

function formatEvolutionChain(chain) {
  const result = {
    name: chain.species.name,
    variations: [],
  };

  function traverseVariations(evolutionDetails, variations) {
    if (evolutionDetails.evolves_to.length === 0) return;

    for (const variation of evolutionDetails.evolves_to) {
      const variationObj = {
        name: variation.species.name,
        variations: [],
      };

      traverseVariations(variation, variationObj.variations);
      variations.push(variationObj);
    }
  }

  traverseVariations(chain, result.variations);
  return JSON.stringify(result, null, 2);
}

module.exports = {
  getEvolutionChain,
  formatEvolutionChain,
};
