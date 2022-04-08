class ListingSerializer < ActiveModel::Serializer
  attributes :id, :identity_id, :service_id, :location_id, :name, :address, :description, :website, :phone, :lat, :long

  has_many :ratings
  has_many :comments
end
