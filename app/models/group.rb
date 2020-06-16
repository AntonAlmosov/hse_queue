class Group < ApplicationRecord
  has_many :group_users
  has_many :lesson_groups
  
  has_many :users, through: :group_users
  has_many :lessons, through: :lesson_groups
end
