class EntryController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  def load_queue
    lesson = Lesson.find(params[:id])
    entries = lesson.entries.order(:position)
    queue = []
      entries.each do |entry|
        queueMember = User.find(entry.user_id)
        queue.push({name: queueMember.name, avatar: polymorphic_url(queueMember.avatar), id: queueMember.id})
      end
    ActionCable.server.broadcast "queue_channel_#{lesson.id}", queue
    head :ok
  end

  def create
    user = User.find(current_user.id)
    lesson = Lesson.find(params[:lesson_id])
    entries = lesson.entries.order(:position)
    new_position = 0
    if entries.last
      new_position = entries.last.position + 1
    end

    if Entry.create(user_id: user.id, lesson_id: lesson.id, position: new_position)
      queue = []
      entries = lesson.entries.order(:position)
      entries.each do |entry|
        queueMember = User.find(entry.user_id)
        queue.push({name: queueMember.name, avatar: polymorphic_url(queueMember.avatar), id: queueMember.id})
      end
      ActionCable.server.broadcast "queue_channel_#{lesson.id}", queue
      head :ok
    end
  end

  def destroy_entry
    user = User.find(current_user.id)
    lesson = Lesson.find(params[:lesson_id])
    entry = Entry.find_by(lesson_id: params[:lesson_id], user_id: user.id)

    if entry.destroy
      queue = []
      entries = lesson.entries.order(:position)
      entries.each do |entry|
        queueMember = User.find(entry.user_id)
        queue.push({name: queueMember.name, avatar: polymorphic_url(queueMember.avatar), id: queueMember.id})
      end
      ActionCable.server.broadcast "queue_channel_#{lesson.id}", queue
      head :ok
    end
  end

  def next_entry
    user = User.find(current_user.id)
    lesson = Lesson.find(params[:lesson_id])
    entry = lesson.entries.order(:position).first

    if entry.destroy
      queue = []
      entries = lesson.entries.order(:position)
      entries.each do |entry|
        queueMember = User.find(entry.user_id)
        queue.push({name: queueMember.name, avatar: polymorphic_url(queueMember.avatar), id: queueMember.id})
      end
      ActionCable.server.broadcast "queue_channel_#{lesson.id}", queue
      head :ok
    end
  end
end
