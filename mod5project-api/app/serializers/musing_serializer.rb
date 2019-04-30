class MusingSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :body, :likes
end
