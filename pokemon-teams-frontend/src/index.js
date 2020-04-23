
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    const BASE_URL = "http://localhost:3000"
    const TRAINERS_URL = `${BASE_URL}/trainers`
    const POKEMONS_URL = `${BASE_URL}/pokemons`
    const main = document.querySelector('main')
   
    fetch(TRAINERS_URL)
        .then(renderJson)
        .then(renderTrainersandPokemons)
        .then(getElementsAddEvents())
    
    function renderJson(response){
            return response.json()
    }

    function renderTrainersandPokemons(json) {
        json.data.forEach(createTrainerCard)
    }
    
    function createTrainerCard(trainer){
        const cardDiv = document.createElement('div')
        const addButton = document.createElement('button')
        const p = document.createElement('p')
        const ul = document.createElement('ul')
        cardDiv.className = 'card'
        addButton.innerText = 'Add Pokemon'
        cardDiv.dataset.trainerId = trainer.id
        p.innerText = trainer.attributes.name
        trainer.attributes.pokemons.map(pokemon => listOfPokemon(pokemon, ul))
        cardDiv.append(p, addButton, ul)
        main.appendChild(cardDiv)
    }

    function listOfPokemon(pokemon, ul){
        const li = document.createElement('li')
        const releaseButton = document.createElement('button')
        releaseButton.className = 'release'
        li.innerText = `${pokemon.nickname} (${pokemon.species})`
        li.dataset.pokeDex = pokemon.id
        releaseButton.innerText = 'Release'
        li.appendChild(releaseButton)
        ul.append(li)
    }

    function getElementsAddEvents(){
        const body = document.querySelector('body')
        body.addEventListener('click', event => {
            if(event.target.innerText === 'Add Pokemon'){
                const pokeArray = Array.from(event.target.nextSibling.children)
                console.log(pokeArray)
                if(pokeArray.length < 6){
                const trainerId = event.target.parentNode.dataset.trainerId
                const cardUl = event.target.parentNode.querySelector('ul')
                fetch(POKEMONS_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({trainer_id: trainerId})
                })
                .then(renderJson)
                .then(json => listOfPokemon(json.data.attributes, cardUl))}
                else{
                    const name = event.target.parentNode.querySelector('p')
                    name.innerText += '! Release some pokemon'
                    console.log(name)
                }
            }
            if(event.target.className === 'release'){
                const pokeDexNumber = event.target.parentNode.dataset.pokeDex
                fetch(`${POKEMONS_URL}/${pokeDexNumber}`, {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                })
                event.target.parentNode.remove()
            }
        })
    }
});
