this.app = angular.module('app', ['templates']);

//this.app.config
//  '$httpProvider', function($httpProvider) {
//    return $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
//  }
//]);

this.app.run(function() {
  return console.log('angular app running');
});

