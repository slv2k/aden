Rails.application.routes.draw do

  resources :locations

  resources :services

  resources :types

  resources :listings

  resources :comments

  resources :ratings

  resources :users, except: :index
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
