class Listing < ApplicationRecord
    has_many :ratings
    has_many :comments

    belongs_to :identity
    belongs_to :service
    belongs_to :location
end
