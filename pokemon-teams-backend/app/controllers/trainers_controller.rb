class TrainersController < ApplicationController

  def index
    trainers = Trainer.all_with_pokemon
    render json: trainers
  end

end
