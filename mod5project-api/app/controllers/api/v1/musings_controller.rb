class Api::V1::MusingsController < ApplicationController
  def index
    @musings = Musing.all
  end

  def create

    # @musing = Musing.create(musing_params)

    @user = User.find(musing_params[:user_id])

    # @user.update(credits: @user.credits += 1)
    @musing = Musing.create(musing_params)
    # byebug
    # @donated_book = DonatedBook.create(book_params)
    @user.musings << @musing
    render json: @musing
    # if @musing.valid?
    #
    #   @token = JWT.encode({user_id: @user.id}, 'secret')
      # render json: { musing: ActiveModel::Serializer::UserSerializer.new(@musing), jwt: @token }, status: :created
    # else
    #   render json: { error: @user.errors }, status: :not_acceptable
    # end
  end


  private

  def musing_params
    params.permit(:user_id, :body, :likes)
  end
end
