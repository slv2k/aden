class Comment < ApplicationRecord
    belongs_to :user
    belongs_to :listing

    validates :text, presence: true
end
