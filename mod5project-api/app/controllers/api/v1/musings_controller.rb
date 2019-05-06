class Api::V1::MusingsController < ApplicationController
  def index
    @musings = Musing.all
    render json: @musings
  end

  def show
    @musing = Musing.find(params[:id])
    render json: @musing
  end

  def create
    @user = User.find(musing_params[:user_id])
    @musing = Musing.create(musing_params)
    @user.musings << @musing
    render json: @musing
  end

  def update
    @musing = Musing.find(params[:id])
    @musing.update(musing_params)
    render json: @musing
  end

  def destroy
    @musing = Musing.find(params[:id])
    @musing.destroy
  end

  private

  def musing_params
    params.permit(:id, :user_id, :body, :likes)
  end

end
