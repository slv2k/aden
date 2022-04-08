class CommentSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :listing_id, :text

  has_one :user
end
