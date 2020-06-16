class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :rememberable, :validatable
  has_one_attached :avatar
  has_many :group_users
  has_many :groups, through: :group_users
  
  enum role: [:student, :teacher, :admin]
  after_initialize :set_default_role, :if => :new_record?

  def set_default_role
    self.role ||= :student
  end
end
