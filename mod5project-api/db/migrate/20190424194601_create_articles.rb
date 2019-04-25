class CreateArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :articles do |t|
      t.string :headline
      t.text :body
      t.integer :likes

      t.timestamps
    end
  end
end
