Rails.application.routes.draw do
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