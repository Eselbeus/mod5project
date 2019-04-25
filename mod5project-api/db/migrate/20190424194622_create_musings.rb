class CreateMusings < ActiveRecord::Migration[5.2]
  def change
    create_table :musings do |t|
      t.text :body
      t.integer :likes

      t.timestamps
    end
  end
end
