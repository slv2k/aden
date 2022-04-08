class FixListingTypeColumn < ActiveRecord::Migration[7.0]
  def change
    rename_column :listings, :type_id, :identity_id
  end
end
