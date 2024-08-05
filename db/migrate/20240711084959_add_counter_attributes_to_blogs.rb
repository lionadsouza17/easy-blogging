class AddCounterAttributesToBlogs < ActiveRecord::Migration[7.0]
  def change
    add_column :blogs, :likes_count, :integer, default: 0
    add_column :blogs, :dislikes_count, :integer, default: 0
  end
end
