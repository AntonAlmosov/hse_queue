class ScheduleController < ApplicationController
  before_action :authenticate_user!

  def index
    user = User.find(current_user.id)
    @avatar = polymorphic_url(user.avatar)
    @is_teacher = user.role == 'teacher'
  end
end
