# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  # before_action :configure_sign_up_params, only: [:create]
  # before_action :configure_account_update_params, only: [:update]
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token  

  def settings
    user = User.find(current_user.id)

    @name = user.name
    @avatar = polymorphic_url(user.avatar)
    @role = 1
    if user.role == 'student'
      @role = 1
      @group = user.group
    end
  end

  def continue_sign_up
    if(current_user.name)
      redirect_to schedule_index_path
    end
  end

  def update_user
    user = User.find(current_user.id)
    user.name = params[:name]
    user.avatar = params[:avatar]
    if params[:role] == 0
      user.role == 'student'
    elsif params[:role] == 1
      user.role == 'teacher'
    end

    if user.save!
      if params.has_key?(:group)
        GroupUser.create(user_id: user.id, group_id: params[:group])
      end
    end
  end

  protected

  def after_sign_up_path_for(resource)
    '/users/continue_sign_up'
  end

  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  # def create
  #   super
  # end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  # end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
