class CreateLessonGroups < ActiveRecord::Migration[6.0]
  def change
    create_table :lesson_groups do |t|
      t.integer :lesson_id
      t.integer :group_id
      t.timestamps
    end
  end
end
