class ApplicationController < ActionController::API
  # protect_from_forgery undefined. Not included with rails-api? necessary?
  # protect_from_forgery with: :null_session
  include SessionsHelper
end
