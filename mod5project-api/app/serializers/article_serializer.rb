class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :headline, :body, :likes
end
