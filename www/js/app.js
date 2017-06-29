// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller("HomeCtrl", function($scope, $ionicPlatform, $cordovaInAppBrowser){
  $ionicPlatform.ready(function() {
    $scope.realizarPagamento = function(){
      
      var request = new XMLHttpRequest();
      var xml = '<?xml version="1.0"?>'+
                  '<checkout>'+
                    '<currency>BRL</currency>'+
                    '<items>'+
                      '<item>'+
                        '<id>0001</id>'+
                        '<description>Bola de futebol</description>'+
                        '<amount>225.30</amount>'+
                        '<quantity>1</quantity>'+
                        '<shippingCost>12.00</shippingCost>'+
                      '</item>'+
                    '</items>'+
                    '<receiver>'+
                      '<email>marcos.amoraes@outlook.com</email>'+
                    '</receiver>'+
                  '</checkout>';
      request.open('POST', 
        'https://ws.sandbox.pagseguro.uol.com.br/v2/checkout?email=marcos.amoraes@outlook.com&token=1CE2FEA2A78946A7ACFD61E1C7F0D2E4', true);
      request.setRequestHeader('Content-Type', 'application/xml');
      request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
            
            parser = new DOMParser();
            data = parser.parseFromString(request.response, "text/xml");
            data = data.getElementsByTagName("code")[0].innerHTML;
            
            var inAppBrowser = $cordovaInAppBrowser.open(
              'https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code='+data, '_blank');
          
          } else {
            console.log(1, 'Houve um erro :(');
          }
      };
      request.onerror = function() {
          console.log(2, 'Houve um erro :(');
      };
      request.send(xml);
    };
  });
});
