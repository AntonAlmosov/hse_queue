Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'users/registrations' } 
  devise_scope :user do
    get 'users/continue_sign_up', to: "users/registrations#continue_sign_up"
    post 'users/update_user', to: "users/registrations#update_user"
  end

  resources :group, only: [:index]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
