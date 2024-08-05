class Blog < ApplicationRecord
    validates :title, presence: true, uniqueness: true
    validates :tag, presence: true
end
