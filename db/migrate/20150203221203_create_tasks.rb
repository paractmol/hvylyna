class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.references :project, index: true
      t.text :description
      t.datetime :started
      t.datetime :finished

      t.timestamps null: false
    end
    add_foreign_key :tasks, :projects
  end
end
