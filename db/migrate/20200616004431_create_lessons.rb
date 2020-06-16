class CreateLessons < ActiveRecord::Migration[6.0]
  def change
    create_table :lessons do |t|
      t.string :name
      t.string :classroom
      t.integer :time
      t.integer :weekday
      
      t.timestamps
    end
  end
end
