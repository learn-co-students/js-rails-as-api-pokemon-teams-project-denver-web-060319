class Trainer < ApplicationRecord
  has_many :pokemons

  def self.all_with_pokemon
    self.all.map do |trainer|
      {
        id: trainer.id,
        name: trainer.name,
        pokemons: trainer.pokemons
      }
    end
  end
end
