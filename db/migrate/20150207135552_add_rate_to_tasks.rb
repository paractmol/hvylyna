class AddRateToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :rate, :decimal
  end
end
