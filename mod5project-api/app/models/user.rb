class User < ApplicationRecord
  has_many :articles
  has_many :musings
  has_many :matches
  has_many :matched_users, through: :matches
  dependent: :destroy
  has_secure_password

  validates :name, :email, :username, :password, presence: true
  validates :username, :email, uniqueness: { case_sensitive: false }

end
