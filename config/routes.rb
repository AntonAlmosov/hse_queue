Rails.application.routes.draw do
  get 'user/update_user'
  devise_for :users, controllers: { registrations: 'users/registrations' } 
  devise_scope :user do
    get 'users/continue_sign_up', to: "users/registrations#continue_sign_up"
    get 'users/settings', to: "users/registrations#settings"
    patch 'users/update_user', to: "user#update_user"
  end

  resources :group, only: [:index]
  resources :schedule, only: [:index]
  resources :lesson, only: [:new, :create, :show]
  resources :entry, only: [:create] do
    collection do
      post :load_queue
      post :destroy_entry
      post :next_entry
    end
  end

  mount ActionCable.server => '/cable'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
