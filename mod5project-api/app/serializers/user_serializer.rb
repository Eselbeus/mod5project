class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id,            :name,             :username,
             :email,         :password,         :gender,
             :age,           :location,         :favorite_genre,
             :favorite_band, :genre,            :members,
             :bio,           :valid_music_link, :is_band,
             :imageUrl,

  def imageUrl
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end

end
