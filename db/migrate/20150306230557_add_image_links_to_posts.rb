class AddImageLinksToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :low_res_img, :string
    add_column :posts, :med_res_img, :string
    add_column :posts, :hi_res_img, :string
  end
end
