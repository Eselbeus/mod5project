Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :users
      post '/login', to: 'auth#create'
      post '/login', to: 'auth#show'
      get '/login', to: 'auth#show'
      get '/profile', to: 'users#profile'
    end
  end
end
