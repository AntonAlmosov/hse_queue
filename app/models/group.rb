class Group < ApplicationRecord
  has_one :user, through: :group_users
end
