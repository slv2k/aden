class FixTypeColumn < ActiveRecord::Migration[7.0]
  def change
    rename_column :identitys, :type, :identity
  end
end
