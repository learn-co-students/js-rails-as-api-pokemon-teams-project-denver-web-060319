require 'faker'

class PokemonsController < ApplicationController

    before_action :set_pokemon, only: [:show, :destroy]

    def show
        render json: @pokemon
    end

    def create
        @trainer = Trainer.find(params[:trainer_id])
        
        if @trainer.pokemons.length < 6
            @pokemon = Pokemon.new(pokemon_params)
            
            if @pokemon.save
                render json: @pokemon, status: :created, location: @pokemon
            else
                render json: @pokemon.errors, status: :unprocessable_entity
            end
        else
            render json: {error: "You can't carry any more Pokemon!"}, status: :unprocessable_entity
        end
    end

    def destroy
        @pokemon.destroy
    end

    private

    def pokemon_params
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        params.require(:pokemon).permit(:trainer_id).merge({nickname: name, species: species})
    end

    def set_pokemon
        @pokemon = Pokemon.find(params[:id])
    end

end
