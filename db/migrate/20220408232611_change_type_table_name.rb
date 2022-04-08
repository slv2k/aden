class ChangeTypeTableName < ActiveRecord::Migration[7.0]
  def change
    rename_table :types, :identitys
  end
end
