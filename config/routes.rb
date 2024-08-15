Rails.application.routes.draw do
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
  root 'home#index'

  namespace :api do
    namespace :v1 do
      resources :blogs, only: [:index, :create] do
        member do
          put :update_counter
        end
      end
    end
  end
end
