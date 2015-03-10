class User < ActiveRecord::Base
  has_many :journeys, dependent: :destroy
  has_many :posts, through: :journeys

  before_save { email.downcase! }

  has_many :misquotables

  validates :name, presence: true, length: { minimum: 1, maximum: 254 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(?:\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 254 },
            format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }
  has_secure_password

  def self.new_remember_token
    SecureRandom.urlsafe_base64
  end

  def self.digest(token)
    Digest::SHA1.hexdigest(token.to_s)
  end

end
