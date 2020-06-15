class GroupController < ApplicationController
  before_action :authenticate_user!

  def index
    groups = Group.all

    render :json => {groups: groups}
  end
end
