class ChangeInstagramIdInUser < ActiveRecord::Migration
  def change
    change_column :users, :instagram_id, 'integer USING CAST(instagram_id AS integer)'
  end
end
