class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :instagram_id
      t.string :email
      t.string :password_digest
      t.string :remember_token
      t.timestamps null: false
    end
  end
end
