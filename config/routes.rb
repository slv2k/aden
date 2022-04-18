Rails.application.routes.draw do

  resources :locations, only: :index

  resources :services, only: :index

  resources :identities, only: :index

  resources :listings

  resources :comments

  resources :ratings

  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
