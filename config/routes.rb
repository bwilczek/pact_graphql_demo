Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
  resources :authors do
    resources :books
  end
  resources :books
end
