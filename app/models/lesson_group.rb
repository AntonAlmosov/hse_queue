class LessonGroup < ApplicationRecord
  belongs_to :group
  belongs_to :lesson
end
