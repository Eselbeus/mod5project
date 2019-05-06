json.extract! @user, :id, :name, :username, :email, :password, :gender, :age, :location, :favorite_genre, :favorite_band, :genre, :members, :bio, :valid_music_link, :is_band
json.imageUrl url_for(@user.image) if @user.image.attached?
