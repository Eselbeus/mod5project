class Api::V1::ArticlesController < ApplicationController
  def index
    @articles = Article.all
    render json: @articles
  end

  def show
    @article = Article.find(params[:id])
    render json: @article
  end

  def create

    @user = User.find(article_params[:user_id])

    @article = Article.create(article_params)

    @user.articles << @article
    render json: @article
  end

  private

  def article_params
    params.permit(:id, :user_id, :headline, :body, :likes, :created_at)
  end
end
