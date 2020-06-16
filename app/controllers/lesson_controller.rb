class LessonController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token  

  def new
    user = User.find(current_user.id)
    @avatar = polymorphic_url(user.avatar)
  end

  def create
    user = User.find(current_user.id)
    lesson = Lesson.new(name: params[:name], time: params[:time], weekday: params[:weekday], classroom: params[:classroom])
    if lesson.save!
      LessonUser.create(user_id: user.id, lesson_id: lesson.id)
      LessonGroup.create(group_id: params[:group], lesson_id: lesson.id)
      render :json => {redirect_path: lesson_path(lesson.id)}
    end
  end

  def show
  end
end
