const { getEvolutionChain } = require("./evolutionChainFinder");

(async () => {
  const pokemonName = "butterfree";
  const evolutionChain = await getEvolutionChain(pokemonName);
  console.log(evolutionChain);
})();
