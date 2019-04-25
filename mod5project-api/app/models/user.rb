class User < ApplicationRecord
  has_many :articles
  has_many :musings
  has_secure_password

  validates :name, :email, :username, :password, presence: true
  validates :username, :email, uniqueness: { case_sensitive: false }

end
