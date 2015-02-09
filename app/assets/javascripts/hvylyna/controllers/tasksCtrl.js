angular.module('app.hvylynaTasks').controller("TasksCtrl", [
  '$scope','$http', '$rootScope', function($scope, $http, $rootScope) {
    console.log('TasksCtrl running');

    $http.get('/tasks.json').
      success(function(data, status, headers, config){
      $scope.tasks = data['tasks'];
    });

    $scope.submit = function(){
      console.log("submit")
      $('form').submit();
    }

    $scope.updateTask = function(task){
      console.log("update")
      $rootScope.$broadcast('task-'+task.id+'-changed')
      $http.put('/tasks/'+task.id+'.json', task).
        success(function(data,status,headers,config){
        console.log(status)
      })
    }

    $scope.destroyTask = function(task){
      $http.delete('/tasks/'+task.id+'.json').
        success(function(){
        for(var i=0; i < $scope.tasks.length; i++){
          if($scope.tasks[i]['id'] === task.id) {
            console.log('found')
            $scope.tasks.splice(i, 1)
          }
        }
        console.log("ok")
      })
    }


    var updateTask = function(id,task){
      for(var i=0; i < $scope.tasks.length; i++){
        if($scope.tasks[i]['id'] === id) {
          console.log('found')
          $scope.tasks[i] = task
        }
      }
    }

    $scope.changeStatus = function(id, status){
      console.log(id, status)
      $http.put('/tasks/'+id+'.json', {task: {status: status}}).
        success(function(data, status, headers, config){
        updateTask(id, data)
        console.log(data);
      })
    }
  }
]).directive('timetracker', ['$interval', function($interval){
  return function(scope, element, attrs){
    var rate = function(){
      return ((attrs.rate / 60) * attrs.timetracker / 60).toFixed(2);
    }
    
    var timeSpentToMinutes = function(ts){
      var addLeadingZero = function(time){
        return ("0" + time).slice(-2)
      }
      return addLeadingZero(Math.floor(ts/3600)) + ':' + addLeadingZero(Math.floor(ts/60)%60) + ":" + addLeadingZero(ts%60)
    }

    var timeTracker = function(){
      var s = '';
      if(attrs.hidetime != 'true') s = s.concat(timeSpentToMinutes(attrs.timetracker) + ' ')
      if(attrs.hiderate != 'true') s = s.concat(rate())
      return element.text(s)
    }
    
    timeTracker();

    scope.$on('task-'+attrs.taskid+'-changed', function(e, args){
      timeTracker();
    })

    var updateTime = function(){
      if(attrs.activated=="false") return
      setTimeout(function(){
        attrs.timetracker++;
        
        timeTracker();
        updateTime();

      }, 1000);
    }

    updateTime();
  }
}])
