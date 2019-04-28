class AddUserIdToMusings < ActiveRecord::Migration[5.2]
  def change
    add_column :musings, :user_id, :integer
  end
end
