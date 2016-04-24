/* 
 * User Controller
*/
app.controller("UserController", ['$scope','$http','$auth', function ($scope,$http,$auth) {
            $http.get('http://localhost:8000/authenticate').success(function (users) {
                $scope.users = users;
            }).error(function (error) {
                $scope.error = error;
            });
}]);