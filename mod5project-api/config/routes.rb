Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :users do
        resources :musings
      end
      resources :users do
        resources :articles
      end
      resources :articles
      resources :musings

      post '/login', to: 'auth#create'
      post '/login', to: 'auth#show'
      get '/login', to: 'auth#show'
      get '/profile', to: 'users#profile'
      get '/users/:id/musings', to: 'musings#index'
      post '/users/:id/articles', to: 'articles#index'
      delete '/musings/:id', to: 'musings#destroy'

    end
  end

end
