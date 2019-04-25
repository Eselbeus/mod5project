class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :email, :password, :gender, :age, :location, :favorite_genre, :favorite_band, :members, :bio, :valid_music_link
end
