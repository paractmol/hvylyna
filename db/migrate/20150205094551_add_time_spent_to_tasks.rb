class AddTimeSpentToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :time_spent, :float
  end
end
