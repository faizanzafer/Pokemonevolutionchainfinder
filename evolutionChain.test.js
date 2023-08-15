const axios = require("axios");
const {
  getEvolutionChain,
  formatEvolutionChain,
} = require("./evolutionChainFinder");

// Mocking axios responses
jest.mock("axios");
const mockPokemonResponse = {
  data: {
    species: {
      url: "https://pokeapi.co/api/v2/pokemon-species/10/",
    },
  },
};
const mockSpeciesResponse = {
  data: {
    evolution_chain: {
      url: "https://pokeapi.co/api/v2/evolution-chain/20/",
    },
  },
};
const mockEvolutionChainResponse = {
  data: {
    chain: {
      species: {
        name: "caterpie",
      },
      evolves_to: [
        {
          species: {
            name: "metapod",
          },
          evolves_to: [
            {
              species: {
                name: "butterfree",
              },
              evolves_to: [],
            },
          ],
        },
      ],
    },
  },
};

test("getEvolutionChain should return the formatted evolution chain", async () => {
  axios.get.mockResolvedValueOnce(mockPokemonResponse);
  axios.get.mockResolvedValueOnce(mockSpeciesResponse);
  axios.get.mockResolvedValueOnce(mockEvolutionChainResponse);

  const evolutionChain = await getEvolutionChain("caterpie");
  const expectedEvolutionChain = JSON.stringify(
    {
      name: "caterpie",
      variations: [
        {
          name: "metapod",
          variations: [
            {
              name: "butterfree",
              variations: [],
            },
          ],
        },
      ],
    },
    null,
    2
  );

  expect(evolutionChain).toEqual(expectedEvolutionChain);
});

test("formatEvolutionChain should return the expected formatted evolution chain", () => {
  const evolutionChain = {
    species: {
      name: "caterpie",
    },
    evolves_to: [
      {
        species: {
          name: "metapod",
        },
        evolves_to: [
          {
            species: {
              name: "butterfree",
            },
            evolves_to: [],
          },
        ],
      },
    ],
  };

  const formattedChain = formatEvolutionChain(evolutionChain);
  const expectedFormattedChain = JSON.stringify(
    {
      name: "caterpie",
      variations: [
        {
          name: "metapod",
          variations: [
            {
              name: "butterfree",
              variations: [],
            },
          ],
        },
      ],
    },
    null,
    2
  );

  expect(formattedChain).toEqual(expectedFormattedChain);
});
