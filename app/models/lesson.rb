class Lesson < ApplicationRecord
  has_many :lesson_groups
  has_many :lesson_users
  has_many :user, through: :lesson_users
  has_many :group, through: :lesson_groups
end
