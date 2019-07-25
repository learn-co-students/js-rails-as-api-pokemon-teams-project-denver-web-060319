const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector('main')

fetch(TRAINERS_URL)
  .then(parseJSON)
  .then(listTrainer)


function BuildTrainer(trainer) {
  let div = document.createElement('div')
  div.className = "card"
  div.dataset.id = trainer.id

  let p = document.createElement('p')
  p.textContent = trainer.name

  let button = document.createElement('button')
  button.dataset.trainerId = trainer.id
  button.textContent = "Add Pokemon"

  let ul = document.createElement('ul')

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

    }
  )

  for(let pokemon of trainer.pokemons) {
    let li = document.createElement('li')
    li.textContent = `${pokemon.nickname} (${pokemon.species})`

    let button = document.createElement('button')
    button.className = "release"
    button.textContent = "Release"
    button.dataset.pokemonId = pokemon.id

    li.appendChild(button)
    ul.appendChild(li)
  }

  div.append(p,button, ul)
  main.appendChild(div)

  button.addEventListener('click', event => {

    let trainer_id = trainer.id

    let allTrainerPokemon = document.querySelectorAll(`[data-id="${trainer_id}"] ul li`)

    if (allTrainerPokemon.length < 6) {

      let obj = {
        "trainer_id": trainer_id
      }

      fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      .then(parseJSON)
      .then(response => {

        let ul = document.querySelector(`[data-id="${trainer_id}"] ul`)
        let li = document.createElement('li')
        li.textContent = `${response.nickname} (${response.species})`

        let button = document.createElement('button')
        button.className = "release"
        button.textContent = "Release"
        button.dataset.pokemonId = response.id

        li.appendChild(button)
        ul.appendChild(li)
      })
    }
  })
}



function listTrainer(trainers) {
  trainers.forEach(BuildTrainer)
}

function parseJSON(response) {
  return response.json()
}
