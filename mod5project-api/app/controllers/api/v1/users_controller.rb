class Api::V1::UsersController < ApplicationController
  def index
    @users = User.all
  end

  def create
    @user = User.create(user_params)
    byebug
    if @user.valid?
      render json: { user: UserSerializer.new(@user) }, status: :created
    else
      render json: { error: 'failed to create user' }, status: :not_acceptable
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :username, :email, :password, :gender, :age, :location, :favorite_genre, :favorite_band, :members, :bio, :valid_music_link)
  end

end
