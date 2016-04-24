var app = angular.module("myApp", ['ui.router', 'satellizer']);

app.config(['$stateProvider', '$urlRouterProvider', '$authProvider', function ($stateProvider, $urlRouterProvider, $authProvider) {
        $authProvider.loginUrl = 'http://localhost:8000/authenticate';
        $urlRouterProvider.otherwise('app/auth');
        $stateProvider
                .state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: 'views/app.html'
                })
                .state('app.auth', {
                    parent: 'app',
                    url: '/auth',
                    templateUrl: 'views/auth.html',
                    controller: 'AuthController',
                    data: []
                })
                .state('app.profile', {
                    parent: 'app',
                    url: '/profile',
                    templateUrl: 'views/profile.html',
                    controller: 'ProfileController',
                    data: ['user', 'admin']
                })
                .state('app.unauthorized', {
                    parent: 'app',
                    url: '/unauthorized',
                    template: 'Unauhorized<br><a ui-sref="app.dashboard">Dashboard</a>',
                    data: []
                })
                .state('app.dashboard', {
                    parent: 'app',
                    url: '/dashboard',
                    template: '<div>Dashboard</div>',
                    data: ['user', 'admin']
                })
                .state('app.users', {
                    parent: 'app',
                    url: '/users',
                    templateUrl: 'views/user-view.html',
                    controller: 'UserController',
                    data: ['user', 'admin']
                });
    }]);

app.run(['$rootScope', '$auth', '$state', '$http', function ($rootScope, $auth, $state, $http) {
        

        $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;
            $rootScope.event = event;

            // Check if role present in data
            if (toState.data.length !== 0) {

                // Check if authenticated
                if ($auth.isAuthenticated()) {

                    // Loop through each element in Data
                    for (var i = 0; i < toState.data.length; i++) {

                        // check if "i" present in token role
                        if ($auth.getPayload().roles.indexOf(toState.data[i]) === -1) {

                            // if yes then redirect to unauthorize
                            event.preventDefault();
                            $state.go('app.unauthorized');
                        } else {

                            // Proceed to page
                            return true;
                        }
                    }
                } else {

                    // Redirect to Login
                    event.preventDefault();
                    $state.go('app.auth');
                }
            }
            if ($auth.isAuthenticated() && toState.name === 'app.auth') {
                console.log('auth');
                event.preventDefault();
                $state.go('app.dashboard');
            }
        });
    }]);