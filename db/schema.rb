# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_04_08_234044) do
  create_table "comments", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "listing_id", null: false
    t.string "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["listing_id"], name: "index_comments_on_listing_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "identities", force: :cascade do |t|
    t.string "identity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "listings", force: :cascade do |t|
    t.integer "identity_id", null: false
    t.integer "service_id", null: false
    t.integer "location_id", null: false
    t.string "name"
    t.string "address"
    t.string "description"
    t.string "website"
    t.string "phone"
    t.string "lat"
    t.string "long"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["identity_id"], name: "index_listings_on_identity_id"
    t.index ["location_id"], name: "index_listings_on_location_id"
    t.index ["service_id"], name: "index_listings_on_service_id"
  end

  create_table "locations", force: :cascade do |t|
    t.string "location"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ratings", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "listing_id", null: false
    t.integer "rating"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["listing_id"], name: "index_ratings_on_listing_id"
    t.index ["user_id"], name: "index_ratings_on_user_id"
  end

  create_table "services", force: :cascade do |t|
    t.string "service"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password"
    t.string "email"
    t.string "bio"
    t.string "avatar"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "comments", "listings"
  add_foreign_key "comments", "users"
  add_foreign_key "listings", "identities"
  add_foreign_key "listings", "locations"
  add_foreign_key "listings", "services"
  add_foreign_key "ratings", "listings"
  add_foreign_key "ratings", "users"
end
