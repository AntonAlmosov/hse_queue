class CreateEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :entries do |t|
      t.integer :user_id
      t.integer :lesson_id
      t.integer :position
      
      t.timestamps
    end
  end
end
