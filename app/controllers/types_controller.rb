class TypesController < ApplicationController
    def index
        types = Type.all
        render json: types, status: :ok
    end
end
