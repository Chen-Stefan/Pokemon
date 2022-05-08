let currentType = null;
let currentRegion = null;
let pokemonName = null;

function createSingleTypePokemon(data_t) {
    let pokemonID = data_t.id;
    let singlePokemonCard = 
    ` ${pokemonName}<div class="picture"> 
<a href="http://localhost:5000/profile/${pokemonID}">
<img src="${data_t.sprites.other["official-artwork"].front_default}">
</a> </div>`; 
    $("main").append(singlePokemonCard);
}


async function processPokemonByType(data) {
    let pokemonArray = data.pokemon;
    for(i = 0; i < pokemonArray.length; i++) {
        pokemonName = pokemonArray[i].pokemon.name;
        await $.ajax({
            type:"GET",
            url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
            success: createSingleTypePokemon
        })
    }  
}

function displaySpecificType(pokemonType) {
    $("main").empty();
    let allTypes = ["normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water", "grass", "electric", "psychic",  "ice", "dragon", "dark", "fairy"];
    currentType = pokemonType;
    typeID = allTypes.indexOf(currentType) + 1
    $.ajax({
        type: "GET",
        url: `https://pokeapi.co/api/v2/type/${typeID}`,
        success: processPokemonByType
    })
}

function createSingleRegionPokemon(data_r) {
    let pokemonID = data_r.id;
    let singleRegionPokemonName = data_r.name;
    let singlePokemonCard = 
    ` ${singleRegionPokemonName}<div class="picture"> 
<a href="http://localhost:5000/profile/${pokemonID}">
<img src="${data_r.sprites.other["official-artwork"].front_default}">
</a> </div>`; 
    $("main").append(singlePokemonCard);
}

function displaySpecificRegion(pokemonRegion) {
    $("main").empty();
    let regionalID = {
        "kanto": [1, 151],
        "johto": [152, 251],
        "hoenn": [252, 386],
        "sinnoh": [387, 494],
        "unova": [495, 649],
        "kalos": [650, 721],
        "alola": [722, 809],
        "galar": [810, 898]
    }
    currentRegion = pokemonRegion;
    let startID = regionalID[currentRegion][0];
    let endID = regionalID[currentRegion][1];
    for (i = startID; i <= endID; i++) {
        $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${i}`,
            success: createSingleRegionPokemon
        })
    }
   
}

function setup() {
    // display the default pokemon type - normal
    displaySpecificType($("#pokemon-type option:selected").val());
    $("#pokemon-type").change(() => {
        pokemonType = $("#pokemon-type option:selected").val();
        displaySpecificType(pokemonType);
    })
    displaySpecificRegion($("#pokemon-region option:selected").val());
    $("#pokemon-region").change(() => {
        pokemonRegion = $("#pokemon-region option:selected").val();
        displaySpecificRegion(pokemonRegion);
    })
}




$(document).ready(setup);