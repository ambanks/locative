class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :caption

      t.decimal :latitude, precision: 10
      t.decimal :longitude, precision: 10
      t.string :time_stamp
      t.integer :journey_id
      t.text :tags, array: true, default: []
      t.timestamps null: false
    end
  end
end
