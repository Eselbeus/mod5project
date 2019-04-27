class Api::V1::UsersController < ApplicationController
  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find(update_params[:id])
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

  private

  def user_params
    params.permit(:name, :username, :email, :password, :gender, :age, :location, :favorite_genre, :favorite_band, :members, :bio, :valid_music_link, :is_band)
  end

end
