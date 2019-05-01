class MatchSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :matched_user_id
end
