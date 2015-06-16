var app = angular.module( 'Vizdum', [
    'templates-app',
    'templates-common',
    'gridster',
    'Vizdum.home',
    'Vizdum.about',
    'ui.router'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run(
    function($rootScope, $urlRouter) {
        console.log('in run');
        $rootScope.$on('$locationChangeSuccess', function(evt) {
            console.log('location change');
            // Halt state change from even starting
            evt.preventDefault();
            // Perform custom logic
            var meetsRequirement = true;
            // Continue with the update and state transition if logic allows
            if (meetsRequirement) $urlRouter.sync();
        });
        // register listener to watch route changes
        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
            console.log('In route change start');
            /*if ( $rootScope.loggedUser == null ) {
                // no logged user, we should be going to #login
                if ( next.templateUrl == "partials/login.html" ) {
                    // already going to #login, no redirect needed
                } else {
                    // not going to #login, we should redirect now
                    //$location.path( "/login" );
                }
            }*/
        });
    }
)

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | Vizdum' ;
    }
  });
});

