'use strict';
//document.writeln("<script type='text/javascript' src='scripts/function/Session.js'></script>");
/**
 * @ngdoc function
 * @name yorAcademyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yorAcademyApp
 */

var app = angular.module('rappi', []);

app.controller('ListCtrl', function ($scope, $http) {
  $http.get('js/data.json').then(function (res) {
    //  console.log(res.data.products);
    $scope.todos = res.data;

    angular.forEach($scope.todos.products, function (value, key) {
      // convierte en String id_class para order en front
      var price = $scope.todos.products[key].price.replace('.', '');
      $scope.todos.products[key].price = parseInt(price);
      $scope.todos.products[key].categName = [];
      angular.forEach($scope.todos.products[key].categories, function (val, ind) {
        angular.forEach($scope.todos.categories, function (v, k) {
          if ($scope.todos.categories[k].categori_id === $scope.todos.products[key].categories[ind]) {
            //  var nombCat = $scope.todos.categories[k].name;
            // $scope.todos.products[key].categName = nombCat + ', ' + $scope.todos.products[key].categName;
            $scope.todos.products[key].categName.push({
              "categori_id": $scope.todos.categories[k].categori_id,
              "name": $scope.todos.categories[k].name
            });
          }
        });
      });
    });
    //  console.log($scope.todos.products);
  });

  $scope.listCart = [];
  $scope.addProduct = function (product) {
    $scope.listCart.push(product);
  };

  $scope.remove = function (item) {
    var index = $scope.listCart.indexOf(item);
    $scope.listCart.splice(index, 1);
  };
  $scope.propertyName = '';
  $scope.availableFilt = '';
  $scope.bestselFilt = '';
  $scope.orderFilter = '';
  $scope.categId = '';

  $scope.filters = $scope.todos;
  $scope.selected = 0;

  $scope.index = '';
  $scope.select = function (index, categori_id) {
    $scope.selected = index;
    $scope.categId = categori_id;
    //  console.log('$scope.categId: '+$scope.categId);
  };

  $scope.sortBy = function (propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };

  // filtro precios > 30.000
  $scope.priceMa = '';
  $scope.greaterThan = function (prop, val) {
    if (val == 30000) {
      return function (item) {
        if (item[prop] > val)
          return true;
      };
    }
    if (val == 10000) {
      return function (item) {
        if (item[prop] < val)
          return true;
      };
    }
  };

});
