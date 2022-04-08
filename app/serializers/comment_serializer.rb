class CommentSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :listing_id, :text
end
