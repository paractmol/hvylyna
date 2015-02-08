json.tasks @tasks do |task|
  json.extract! task, :id, :project_id, :description, :started, :finished, :status, :started, :finished, :time_spent, :activated, :rate
  json.url task_url(task, format: :json)
end

json.task_statuses Task.statuses.keys
