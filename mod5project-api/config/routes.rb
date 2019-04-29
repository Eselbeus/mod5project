Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :users do
        resources :musings
      end
      post '/login', to: 'auth#create'
      post '/login', to: 'auth#show'
      get '/login', to: 'auth#show'
      get '/profile', to: 'users#profile'
      get '/users/:id/musings', to: 'musings#index'
    end
  end

end
