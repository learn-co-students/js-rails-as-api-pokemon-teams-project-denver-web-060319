const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
  .then(parseJSON)
  .then(listTrainer)


function BuildTrainer(trainer) {
  let div = document.createElement('div')
  div.className = "card"
  div.dataset.id = trainer.id

  addTrainerName(div, trainer.name)
  addPokemon(div, trainer.id)
  listPokemons(div, trainer.pokemons)

  const main = document.querySelector('main')
  main.appendChild(div)
}

function addTrainerName(div, name) {
  let p = document.createElement('p')
  p.textContent = name
  div.appendChild(p)
}

function listPokemons(div, pokemons) {
  let ul = document.createElement('ul')
  for(let pokemon of pokemons) {
    let li = renderListItemPokemon(pokemon)
    ul.appendChild(li)
  }

  releasePokemon(ul)
  div.appendChild(ul)
}

function releasePokemon(ul) {
  ul.addEventListener('click', event => {
    if(event.target.tagName == 'BUTTON') {
      event.target.parentNode.remove()

      fetch(`${POKEMONS_URL}/${event.target.dataset.pokemonId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  })
}

function addPokemon(div, trainerId) {
  let button = document.createElement('button')
  button.dataset.trainerId = trainerId
  button.textContent = "Add Pokemon"
  button.addEventListener('click', event => {

  let allTrainerPokemon = document.querySelectorAll(`[data-id="${trainerId}"] ul li`)

  if (allTrainerPokemon.length < 6) {
    createPokemon(trainerId)
    }
  })
  div.appendChild(button)
}

function createPokemon(trainerId) {
  let obj = {
    "trainer_id": trainerId
  }

  fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
  .then(parseJSON)
  .then(pokemon => {

    let ul = document.querySelector(`[data-id="${trainerId}"] ul`)
    let li = renderListItemPokemon(pokemon)
    ul.appendChild(li)
  })
}

function renderListItemPokemon(pokemon) {
  let li = document.createElement('li')
  li.textContent = `${pokemon.nickname} (${pokemon.species})`

  let button = document.createElement('button')
  button.className = "release"
  button.textContent = "Release"
  button.dataset.pokemonId = pokemon.id

  li.appendChild(button)
  return li
}

function listTrainer(trainers) {
  trainers.forEach(BuildTrainer)
}

function parseJSON(response) {
  return response.json()
}
