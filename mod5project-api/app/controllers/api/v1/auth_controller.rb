class Api::V1::AuthController < ApplicationController
  def show

    jwt = request.headers['Authorization']
    id = JWT.decode(jwt, "secret")[0]["user_id"]
    @user = User.find(id)
    render json: { user: @user }
  end

  def create
    @user = User.find_by(username: user_login_params[:username])
    #User#authenticate comes from BCrypt

    if @user && @user.authenticate(user_login_params[:password])
      # encode token comes from ApplicationController
      token = JWT.encode({ user_id: @user.id}, "secret")
      render json: { user: UserSerializer.new(@user), jwt: token }, status: :accepted
    else
      render json: { message: 'Invalid username or password' }, status: :unauthorized
    end
  end

  private

  def user_login_params
    # params { user: {username: 'Chandler Bing', password: 'hi' } }
    params.permit(:username, :password)
  end
end
