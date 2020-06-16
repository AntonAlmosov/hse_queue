class UserController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token  
  
  def update_user
    user = User.find(current_user.id)
    user.name = params[:name]
    if params.has_key?(:avatar)
      user.avatar = params[:avatar]
    end
    
    if params[:role] == '0'
      user.role = 'student'
    elsif params[:role] == '1'
      user.role = 'teacher'
    end

    user.group_users.each do |group|
      group.destroy
    end

    if user.save!
      if params.has_key?(:group)
        GroupUser.create(user_id: user.id, group_id: params[:group])
      end
    end
  end
end
