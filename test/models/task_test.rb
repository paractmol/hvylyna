require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  test "time_spent" do
    task = Task.first
    task.update(:status => 'started')
    sleep 1
    assert task.time_spent === Time.now.to_i - task.started.to_i + task.read_attribute(:time_spent)
    task.update(:status => 'paused')
    assert task.read_attribute(:time_spent) === task.time_spent
    task.update(:status => 'ongoing')
    sleep 1
    task.update(:status => 'finished')
    assert task.time_spent === task.finished.to_i - task.started.to_i
  end
end
