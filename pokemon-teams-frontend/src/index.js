const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainTag = document.querySelector("main")
const Json = ""

fetch(TRAINERS_URL)
    .then(parseJson)
    .then(displayTrainers)
    .then(addPokemonsDeleteButtons)

mainTag.addEventListener("click", addPokemon)

function dictionary(eventClass){
    $ = {
        "add-pokemon-button"(){ postPokemon(event) },
        "release"(){ deletePokemonFromDomAndDB(event) }
    }
    $[eventClass]()
}

function parseJson(response){
    return response.json()
}

function displayTrainers(trainers){
    trainers.map(trainerMapping)
}

function addPokemonsDeleteButtons(){
    pokemonDeleteButtonsCollection = document.querySelectorAll(".release")
    pokemonDeleteButtons = Array.from(pokemonDeleteButtonsCollection)
}

function addPokemon(event) {
    dictionary(event.target.className)
}

function postPokemon(event){
    trainerId = event.target.dataset.trainerId
    fetchCall(POKEMONS_URL, "POST", {trainer_id: trainerId})
        .then(parseJson)
        .then(displayPokemon)
}

function trainerMapping(trainer){
    const trainerCard = createTrainerCardElements(trainer)    
    createAndAppendPokemons(trainer, trainerCard)
    appendTrainerCardElements(trainerCard)
}

function createTrainerCardElements(trainer){
    const trainerDiv = document.createElement("div")
    trainerDiv.className = "card"
    trainerDiv.dataset.id = trainer.id
    
    const trainerName = document.createElement("p")
    trainerName.textContent = trainer.name
    
    const addPokemonButton = document.createElement("button")
    addPokemonButton.dataset.trainerId = trainer.id
    addPokemonButton.textContent = "Add Pokemon"
    addPokemonButton.className = "add-pokemon-button"
    
    const pokemonList = document.createElement("ul")
    pokemonList.className = "pokemon-list"

    return {
        trainerDiv,
        trainerName,
        addPokemonButton,
        pokemonList,
    }
}

function createAndAppendPokemons(trainer, trainerCard){
    trainer.pokemons.map(pokemon => {
        const pokemonCard = createPokemonElements(pokemon)
        appendPokemonElements(trainerCard, pokemonCard)
    })
}

function appendTrainerCardElements(trainerCard){
    trainerCard.trainerDiv.append(trainerCard.trainerName,
                                trainerCard.addPokemonButton,
                                trainerCard.pokemonList)
    mainTag.appendChild(trainerCard.trainerDiv)
}

function deletePokemonFromDomAndDB(event) {
    pokemonId = event.target.dataset.pokemonId
    fetchCall(`${POKEMONS_URL}/${pokemonId}`, "DELETE")
    event.target.parentNode.remove()
}

function displayPokemon(pokemon){
    const pokemonCard = createPokemonElements(pokemon)
    appendNewPokemon(pokemonCard, pokemon)
}

function createPokemonElements(pokemon){
    const pokemonLi = document.createElement("li")
    pokemonLi.textContent = `${pokemon.nickname} (${pokemon.species})`
    
    const pokemonReleaseButton = document.createElement("button")
    pokemonReleaseButton.textContent = "Release"
    pokemonReleaseButton.className = "release"
    pokemonReleaseButton.dataset.pokemonId = pokemon.id

    return {
        pokemonLi,
        pokemonReleaseButton,
    }
}

function appendPokemonElements(trainerCard, pokemonCard){
    pokemonCard.pokemonLi.appendChild(pokemonCard.pokemonReleaseButton)
    trainerCard.pokemonList.appendChild(pokemonCard.pokemonLi)
}

function appendNewPokemon(pokemonCard, pokemon){
    pokemonCard.pokemonLi.appendChild(pokemonCard.pokemonReleaseButton)                    
    pokemonList = document.querySelector(`[data-id='${pokemon.trainer_id}'] > ul`)
    pokemonList.appendChild(pokemonCard.pokemonLi)
}

function fetchCall(url, method, bodyData){
    return fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyData)
    })
}