class AddInstagramIdToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :instagram_id, :string
    change_column :posts, :latitude, :decimal, precision: 10, scale: 8 
    change_column :posts, :longitude, :decimal, precision: 10, scale: 8 
    add_column :users, :instagram_name, :string
  end
end
