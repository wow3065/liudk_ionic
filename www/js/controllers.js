angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('WeatherCtrl', function($scope,$ionicLoading,$http) {
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    noBackdrop: false ,
    maxWidth: 200,
    showDelay: 0
  });

  var result = baidu_location.getCurrentPosition(function(data){
//    $scope.latitude = data.latitude;
//    $scope.longitude = data.longitude;
//    $scope.province = data.province;
//    $scope.city = data.city;
//    $scope.district = data.district;
//    $scope.$apply();
//    $ionicLoading.hide();
    var city = data.district;
    $scope.date=new Date();
    $http({
      'url':'https://api.heweather.com/x3/weather?city='+city.substring(0,city.length-1)+'&key=68a6fa02530e4806bb6117517167c7de',
      'method':'GET'
    }).success(function(data,header,config,status){
      var weather = data["HeWeather data service 3.0"][1];
      $scope.weather = weather;
      $scope.others = weather.daily_forecast.slice(1) ;
      $ionicLoading.hide();
    }).error(function(data,header,config,status){
      $ionicLoading.hide();
    });
  }, function(err){$ionicLoading.hide();});
});
