class Api::V1::MatchesController < ApplicationController
  def index
    # @matched_users = MatchMaker.matches_for(current_user)
    # .page(params[:page])
    @matches = Match.all
    render json: @matches
  end

  def create
    # byebug
    @user = User.find(params[:user_id])

    @matched_user = User.find(params[:matched_user_id])
    @match = Match.create(match_params)


    render json: @match
  end

  private

  def match_params
    params.require(:match).permit(:id, :user_id, :matched_user_id)
  end
end
