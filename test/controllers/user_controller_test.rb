require 'test_helper'

class UserControllerTest < ActionDispatch::IntegrationTest
  test "should get update_user" do
    get user_update_user_url
    assert_response :success
  end

end
