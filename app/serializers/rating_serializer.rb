class RatingSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :listing_id, :rating
end
