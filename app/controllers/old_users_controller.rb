# class UsersController < ApplicationController
#   before_action :signed_in_user,  only: [:update, :destroy]
#   before_action :correct_user,    only: [:update]
#   before_action :redirect_if_signed_in, only: [:create]


#   # GET /users
#   # GET /users.json
#   def index
#     @users = User.all
#     render json: @users
#   end

#   # GET /users/1
#   # GET /users/1.json
#   def show
#     @user = User.find(params[:id])
#     render json: @user
#   end

#   def new
#     # @user = User.new(new_user_params)
#     render json: @user
#   end

#   # POST /users
#   # POST /users.json
#   def create
#     @user = User.new(user_params)

#     if @user.save
#       sign_in @user
#       render json: @user, status: :created, location: @user
#       # # previously, we did a redirect here, 
#       # # this will probably need to be handled on the front end
#       # redirect_to user_path @user
#     else
#       render json: @user.errors, status: :unprocessable_entity
#     end
#   end

#   # PATCH/PUT /users/1
#   # PATCH/PUT /users/1.json
#   def update
#     @user = User.find(params[:id])

#     if @user.update(user_params)
#       head :no_content
#       # # previously, we redirected to profile page
#         # flash[:success] = "Profile updated."
#         # redirect_to user_path @user
#     else
#       render json: @user.errors, status: :unprocessable_entity
#     end
#   end

#   # DELETE /users/1
#   # DELETE /users/1.json
#   def destroy
#     @user = User.find(params[:id])
#     @user.destroy

#     head :no_content

#     # # another message and redirect
#     # flash[:success] = "Account deleted."
#     # redirect_to root_path
#   end

#   private

#     def user_params
#       params.require(:user).permit(:name, :email, :password, :password_confirmation, :instagram_name)
#     end

#     def new_user_params
#       params.permit(:name, :email, :password, :password_confirmation, :instagram_name)
#     end

#     def correct_user
#       @user = User.find(params[:id])
#       # TODO send error json instead of redirect
#       # redirect_to(root_path) unless current_user?(@user)
#     end

# end
