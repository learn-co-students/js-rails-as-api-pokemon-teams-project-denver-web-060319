const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainTag = document.querySelector("main")

fetch(TRAINERS_URL)
    .then(parseJson)
    .then(setTrainers)
    .then(addPokemonButton)
    .then(addDeleteButton)

function parseJson(response){
    return response.json()
}

function setTrainers(trainers){
    trainers.map(trainer => {
        
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
        
        trainer.pokemons.map(pokemon => {
            const pokemonLi = document.createElement("li")
            pokemonLi.textContent = `${pokemon.nickname} (${pokemon.species})`
            const pokemonReleaseButton = document.createElement("button")
            pokemonReleaseButton.textContent = "Release"
            pokemonReleaseButton.className = "release"
            pokemonReleaseButton.dataset.pokemonId = pokemon.id

            pokemonLi.appendChild(pokemonReleaseButton)
            pokemonList.appendChild(pokemonLi)
        })

        trainerDiv.append(trainerName, addPokemonButton, pokemonList)
        mainTag.appendChild(trainerDiv)
    })
}

function addPokemonButton(){
    
    addPokemonButtonsCollection = document.querySelectorAll(".add-pokemon-button")
    addPokemonButtons = Array.from(addPokemonButtonsCollection)

    addPokemonButtons.forEach(addPokemonButton => {
        addPokemonButton.addEventListener("click", function() {
            trainerId = event.target.dataset.trainerId
            
            pokemonListLis = document.querySelectorAll(`[data-id='${trainerId}'] > ul > li`)

            if (pokemonListLis.length < 6) {
                trainerIdObject = {
                    trainer_id: trainerId
                }
                fetch(POKEMONS_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(trainerIdObject)
                }).then(parseJson)
                .then(pokemon => {
                    const pokemonLi = document.createElement("li")
                    pokemonLi.textContent = `${pokemon.nickname} (${pokemon.species})`
                    const pokemonReleaseButton = document.createElement("button")
                    pokemonReleaseButton.textContent = "Release"
                    pokemonReleaseButton.className = "release"
                    pokemonReleaseButton.dataset.pokemonId = pokemon.id
                    
                    pokemonLi.appendChild(pokemonReleaseButton)
                    
                    pokemonList = document.querySelector(`[data-id='${pokemon.trainer_id}'] ul`)
                    pokemonList.appendChild(pokemonLi)
                    
                    pokemonReleaseButton.addEventListener("click", function() {
                        pokemonId = event.target.dataset.pokemonId
                        fetch(`${POKEMONS_URL}/${pokemonId}`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json"
                            },
                        }).then(event.target.parentNode.remove())
                    })
                })
            }
        })
    })
}

function addDeleteButton(){
    pokemonDeleteButtonsCollection = document.querySelectorAll(".release")
    pokemonDeleteButtons = Array.from(pokemonDeleteButtonsCollection)

    pokemonDeleteButtons.forEach(pokemonDeleteButton => {
        pokemonDeleteButton.addEventListener("click", function() {
            pokemonId = event.target.dataset.pokemonId
            fetch(`${POKEMONS_URL}/${pokemonId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(event.target.parentNode.remove())
        })
    })
}