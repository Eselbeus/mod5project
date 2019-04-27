class Api::V1::MusingsController < ApplicationController
  def index
    @musings = Musing.all
  end

  def create
    @musing = Musing.create(user_params)

    if @musing.valid?

      @token = JWT.encode({user_id: @user.id}, 'secret')
      render json: { musing: ActiveModel::Serializer::UserSerializer.new(@musing), jwt: @token }, status: :created
    else
      render json: { error: @user.errors }, status: :not_acceptable
    end
  end


  private

  def musings_params
    params.permit(:id, :body)
  end
end
