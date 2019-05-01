class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :headline, :body, :likes, :created_at
end
