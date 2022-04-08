class FixIdentityTableName < ActiveRecord::Migration[7.0]
  def change
    rename_table :identitys, :identities
  end
end
