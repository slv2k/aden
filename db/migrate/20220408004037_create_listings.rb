class CreateListings < ActiveRecord::Migration[7.0]
  def change
    create_table :listings do |t|
      t.belongs_to :type, null: false, foreign_key: true
      t.belongs_to :service, null: false, foreign_key: true
      t.belongs_to :location, null: false, foreign_key: true
      t.string :name
      t.string :address
      t.string :description
      t.string :website
      t.string :phone
      t.string :lat
      t.string :long

      t.timestamps
    end
  end
end
