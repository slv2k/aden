class ListingsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    
    skip_before_action :verify_authenticity_token
    
    def index
        listings = Listing.all
        render json: listings, status: :ok
    end

    def create
        listing = Listing.create(listing_params)
        render json: listing, status: :created
    end

    private

    def listing_params
        params.permit(:id, :identity_id, :service_id, :location_id, :name, :address, :description, :website, :phone, :lat, :long)
    end

    def render_unprocessable_entity_response(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end
end
