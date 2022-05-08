let pokemonType = "grass";

function displaySpecificType(pokemonType) {
    $("main").html()
}



function setup() {
    // display the default pokemon type - grass
    displaySpecificType($("#pokemon-type option:selected").val());
    $("#pokemon-type").change(() => {
        pokemonType = $("#pokemon-type option:selected").val();
    })
}




$(document).ready(setup);