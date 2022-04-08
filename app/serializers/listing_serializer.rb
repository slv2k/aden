class ListingSerializer < ActiveModel::Serializer
  attributes :id, :type_id, :service_id, :location_id, :name, :address, :description, :website, :phone, :lat, :long
end
