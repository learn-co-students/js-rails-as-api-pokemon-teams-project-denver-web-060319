class Trainer < ApplicationRecord
    has_many :pokemons

    # def self.all_with_pokemon
    #     self.all.map { |trainer|
    #         {
    #             id: trainer.id,
    #             name: trainer.name,
    #             pokemons: trainer.pokemons,
    #             created_at: trainer.created_at,
    #             updated_at: trainer.updated_at
    #         }
    #     }
    # end
    
end
