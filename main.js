const pokemonList = document.getElementById("pokemonList")
const pokemonDetail = document.getElementById("pokemonDetail")
const backBTN = document.getElementById("backBTN")
const pokemonInfo = document.getElementById("pokemonInfo")
const searchInput = document.getElementById("searchInput")
const searchBtn = document.getElementById("searchBtn")
let query = ""
async function fetchPokemonData(pokemonID) {
    const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemonID}/`)
    const pokemon= await response.json()
    return pokemon  
}
//async function fetchMoveData(url) {
//    const response = await fetch (`https://pokeapi.co/api/v2/move/${movesID}/`)
//    const moves= await response.json()
//    return moves  
//   
//}


function displayPokemon(pokemon){
    const pokemonCard = document.createElement("div")
    pokemonCard.classList.add("pokemonCard")
    pokemonCard.innerHTML =`
        <div class="container">
            <div class="box">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <div class="content">
                <h3>${pokemon.name}</h3>
                <img src=${pokemon.sprites.front_default} alt="${pokemon.name}">
                </div>
            </div>
        </div>
    `
    pokemonCard.addEventListener("click",()=>showPokemonDetail(pokemon))
    pokemonList.appendChild(pokemonCard)
}

function showPokemonDetail (pokemon){
    pokemonList.style.display= "none"
    pokemonDetail.style.display = "block"
    let abilitiess=""
    pokemon.abilities.forEach( abilities => {
        abilitiess= abilitiess + `<li class="abilities"> ${abilities.ability.name}</li>`
    })
    //for(let i=0; i<pokemon.abilities.length; i++){
    //   abilities = abilities+pokemon.abilities[i].ability.name + "<br>"
    //}
    let statsToPrint = ""
    pokemon.stats.forEach(stat => {
        statsToPrint=statsToPrint + `<li class="stats"> ${stat.stat.name}: ${stat.base_stat}</li>`
    })
    let moveToPrint = ""
    pokemon.moves.forEach(moves => {
        moveToPrint=moveToPrint + `<<option value="${moves.move.name}">${moves.move.name}</option>>`
    })
    pokemonInfo.innerHTML =`
        <h3>${pokemon.name}</h3>
        <img src=${pokemon.sprites.front_default} alt="${pokemon.name}">
        <h3>abilities</h3><br>
        <ul>
        ${abilitiess}
        </ul><br>
        <h3>stats</h3><br>
        <ul>
        ${statsToPrint}
        </ul><br>
        <h3>moves</h3><br>
        <select name="moves" id="moves">
        ${moveToPrint}
        </select>
    `
}

backBTN.addEventListener("click",()=>{
    pokemonDetail.style.display="none"
    pokemonList.style.display="block"
})

async function loadPokedex() {
    for(let i=01; i<51; i++){
        dato = await fetchPokemonData(i)
        displayPokemon(dato)
    }
}


loadPokedex()

searchInput.addEventListener("input", (evento)=>{
    query=evento.target.value;
})

async function serchPokemon() {
    
    try {
        const pokemon = await fetchPokemonData(query)
        showPokemonDetail(pokemon)
    } catch (error) {
        alert("Pokemon no encontrado, intenta con otro ID o nombre")
    }
}
searchBtn.addEventListener("click",()=>{
    console.log(query)
    serchPokemon()
})
