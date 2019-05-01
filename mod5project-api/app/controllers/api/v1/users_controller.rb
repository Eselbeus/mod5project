class Api::V1::UsersController < ApplicationController
  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def create
    @user = User.create(user_params)

    if @user.valid?

      @token = JWT.encode({user_id: @user.id}, 'secret')
      render json: { user: ActiveModel::Serializer::UserSerializer.new(@user), jwt: @token }, status: :created
    else
      render json: { error: @user.errors }, status: :not_acceptable
    end
  end

  def update

    @user = User.find(params[:id])
    # byebug
    @user.update(user_update_params)

    render json: @user
  end

  private

  def user_params
    params.permit(:id, :name, :username, :email, :password, :gender, :age, :location, :favorite_genre, :favorite_band, :members, :bio, :valid_music_link, :is_band)
  end

  def user_update_params
    params.require(:user).permit(:id, :name, :username, :email, :gender, :age, :location, :favorite_genre, :favorite_band, :members, :bio, :valid_music_link, :is_band)
  end

end
