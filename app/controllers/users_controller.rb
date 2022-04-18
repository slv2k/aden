class UsersController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response


    skip_before_action :verify_authenticity_token

    def index
        users = User.all
        render json: users, status: :ok
    end

    def show
        user = find_user
        render json: user
        # TODO: custom serializer for displaying bookmarks?
    end

    def create
        user = User.create!(user_params)
        render json: user, status: :created
    end

    def update
        user = find_user
        user.update(user_params)
        render json: user
    end

    def destroy
        user = find_user
        user.destroy
        head :no_content
    end

    private

    def user_params
        params.permit(:username, :password, :email, :bio, :avatar)
    end

    def find_user
        User.find(params[id])
    end

    def render_not_found_response
        render json: { error: "User not found" }, status: :not_found
    end

    # def render_unprocessable_entity_response
    #     render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    # end
end
