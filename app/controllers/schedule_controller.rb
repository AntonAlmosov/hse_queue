class ScheduleController < ApplicationController
  before_action :authenticate_user!

  def index
    user = User.find(current_user.id)
    @avatar = polymorphic_url(user.avatar)
    @is_teacher = user.teacher?
    @schedule = [[], [], [], [], [], []]
    if user.role === 'student'
      groups = user.groups
      groups.each do |group|
        (0...5).each do |weekday|
          group.lessons.where(weekday: weekday).order(:time).each do |lesson|
            @schedule[weekday].push({id: lesson.id, url: lesson_path(lesson.id), name: lesson.name, user: lesson.user.first, time: lesson.time, classroom: lesson.classroom})
          end
        end
      end
    end
    if user.role === 'teacher'
      (0...5).each do |weekday|
        user.lessons.where(weekday: weekday).order(:time).each do |lesson|
          @schedule[weekday].push({id: lesson.id, url: lesson_path(lesson.id), name: lesson.name, user: lesson.user.first, time: lesson.time, classroom: lesson.classroom})
        end
      end
    end
  end
end
