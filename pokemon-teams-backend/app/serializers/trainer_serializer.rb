class TrainerSerializer < ActiveModel::Serializer
  attributes :id, :name, :pokemons
  # def pokemons
  #   object.pokemons.map { |pokemon|
  #     { id: pokemon.id,
  #       nickname: pokemon.nickname,
  #       species: pokemon.species,
  #       trainer_id: pokemon.trainer_id
  #     }
  #   }
  # end
end
