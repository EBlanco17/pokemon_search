const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

const pokemonID = document.getElementById("pokemon-id");
const pokemonName = document.getElementById("pokemon-name");
const pokemonImage = document.getElementById("sprite");
const types = document.getElementById("types");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const url = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

const getPokemon = async (pokemon) => {
  try {
    const response = await fetch(`${url}${pokemon}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching Pokémon data:", err);
  }
};

const displayPokemon = (pokemon) => {
  pokemonID.textContent = "#" + pokemon.id;
  pokemonName.textContent = pokemon.name.toUpperCase();
  pokemonImage.src = pokemon.sprites.front_default;
  pokemonImage.alt = pokemon.name + " image";
  types.innerHTML = `${pokemon.types
    .map(
      (type) => `<div class="type ${type.type.name}">${type.type.name}</div> `
    )
    .join("")}`;
  height.textContent = `Height: ${pokemon.height}`;
  weight.textContent = `Weight: ${pokemon.weight}`;
  hp.textContent = pokemon.stats[0].base_stat;
  attack.textContent = pokemon.stats[1].base_stat;
  defense.textContent = pokemon.stats[2].base_stat;
  specialAttack.textContent = pokemon.stats[3].base_stat;
  specialDefense.textContent = pokemon.stats[4].base_stat;
  speed.textContent = pokemon.stats[5].base_stat;
};

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const pokemonNameInput = searchInput.value.toLowerCase().trim();
  const pokemonData = await getPokemon(pokemonNameInput);
  if (pokemonData) {
    displayPokemon(pokemonData);
  } else {
    alert("Pokémon not found");
    resetUI();
  }
});

const resetUI = () => {
  searchInput.value = "";
  pokemonID.textContent = "#";
  pokemonName.textContent = "Pokémon";
  pokemonImage.src = "";
  pokemonImage.alt = "";
  types.textContent = "";
  height.textContent = "Height:";
  weight.textContent = "Weight:";
  hp.textContent = "-";
  attack.textContent = "-";
  defense.textContent = "-";
  specialAttack.textContent = "-";
  specialDefense.textContent = "-";
  speed.textContent = "-";
};

resetUI();
