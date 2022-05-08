let currentType = null;
let pokemonName = null;

function createSingleTypePokemon(data_) {
    let pokemonID = data_.id;
    let singlePokemonCard = 
    ` ${pokemonName}<div class="picture"> 
<a href="http://localhost:5000/profile/${pokemonID}">
<img src="${data_.sprites.other["official-artwork"].front_default}">
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



function setup() {
    // display the default pokemon type - grass
    displaySpecificType($("#pokemon-type option:selected").val());
    $("#pokemon-type").change(() => {
        pokemonType = $("#pokemon-type option:selected").val();
        displaySpecificType(pokemonType);
    })
}




$(document).ready(setup);