let pokedex = document.getElementById("pokedex");

console.log(pokedex)

const promises = [];
for(let i = 1; i <= 150; i++){
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((response) => response.json()));
}

    Promise.all(promises).then((results) => {
        const pokemonArr = results.map((json) => ({
            id: json.id,
            name: json.name,
            image: json.sprites.front_default,
            //Original Version to Access Main Type "grass"
            // pokemonArr['types'] = json.types[0].type.name;
            
            //Improved Version to Access Both Types "grass, posion"
            type: json.types.map(type => type.type.name).join(", ")
        }));
        displayPokemon(pokemonArr);
    });

    const displayPokemon = (pokemonArr) => {
        console.log(pokemonArr);
        
        const pokemonHTMLString = pokemonArr.map(eachPokemon => 
            `<li class = "card">
                <img class = "card-image" src = "${eachPokemon.image}"/>
                <h2 class = "card-title"> ${eachPokemon.id}. ${eachPokemon.name} </h2>
                <p class = "card-subtitle"> Type: ${eachPokemon.type} </p>
            </li>
            `).join('');
            
            pokedex.innerHTML = pokemonHTMLString;

    };