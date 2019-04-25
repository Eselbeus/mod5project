class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.string :username
      t.string :email
      t.string :password_digest
      t.string :gender
      t.integer :age
      t.string :location
      t.string :favorite_genre
      t.string :favorite_band
      t.string :members
      t.text :bio
      t.string :valid_music_link
      t.boolean :is_band, default: false

      t.timestamps
    end
  end
end
