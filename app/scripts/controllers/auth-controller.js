/* 
 * Auth Controller
*/
app.controller("AuthController", ['$scope', '$auth','$state', function ($scope, $auth,$state) {
    $scope.login = function(){
        var credentials = {
            email: $scope.user.email,
            password: $scope.user.password
        }
        $auth.login(credentials).then(function (data) {
            $state.go('app.users');
        });  
    };
}]);