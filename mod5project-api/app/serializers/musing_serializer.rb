class MusingSerializer < ActiveModel::Serializer
  attributes :user_id, :body, :likes
end
