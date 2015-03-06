class User < ActiveRecord::Base
  has_many :journeys, dependent: :destroy
  has_many :posts, through: :journeys
end
