class Task < ActiveRecord::Base
  belongs_to :project
  enum status: [:unstarted, :started, :paused, :ongoing, :finished]
  before_save :set_dates, :set_time_spent

  default_scope { order('created_at DESC') } 
  
  def activated
    ["started", "ongoing"].include?(status)
  end

  def time_spent
    if ["started", "ongoing"].include? status
      Time.now.to_i - started.to_i + read_attribute(:time_spent)
    else
      super
    end
  end

  def rate
    super.to_f if super.present?
  end

  private

  def set_time_spent
    return if new_record? || !status_changed?
    ts = 0
    ts = read_attribute(:time_spent) if ["paused","ongoing","finished"].include? status
    ts = ts + (finished.to_i - started.to_i) if finished.to_i > started.to_i

    self.time_spent = ts
  end

  def set_dates
    return if new_record? || !status_changed?
    column = case status
    when "started", "ongoing"
      "started"
    when "finished", "paused"
      "finished"
    end

    self.send("#{column}=", Time.now)
  end
end
