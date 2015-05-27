/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'Vizdum.home', [
    'ui.router',
    'httpServices'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' },
     resolve: {
         testList: function () {
             console.log('in here');/*
             var jsonObj = {
                 module: 'todo',
                 param: ''
             };
             return HttpServices.get(jsonObj).then(
                 function(data) {
                     return data;
                 }
             );*/
         }
     }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', function HomeController( $scope, HttpServices) {
        var tempArray = [];
        $scope.todos = [];

        $scope.addTodoTask = function () {
            var jsonObj = {
                module: 'todo',
                param: '',
                data: {task: $scope.todoText, completed: false}
            };

            HttpServices.set(jsonObj).then(function (msg) {
               console.log(msg);
                $scope.todos.push(jsonObj.data);
                $scope.todoText = " ";
            });
        };

        $scope.clearCompleted = function () {
            console.log('clearCompleted');
            var showAll = false;
            if($('#btnNextOp').text() == "Hide Completed Tasks") {
                $('#btnNextOp').text("Show All Tasks");
                tempArray = $scope.todos;
                $scope.todos = _.filter($scope.todos, function (todo) {
                    return !todo.completed;
                });
            } else {
                $('#btnNextOp').text("Hide Completed Tasks");
                $scope.todos = tempArray;
            }

        };

        $scope.getTotalTodos = function () {
            return _.filter($scope.todos, function (todo) {
                return !todo.completed;
            }).length;
        };

        // I load the remote data from the server.
        var loadRemoteData = function() {
            // The friendService returns a promise.
            var jsonObj = {
                module: 'todo',
                param: ''
            };
            HttpServices.get(jsonObj).then(
                function(items) {
                    applyRemoteData(items);
                }
            );
        };

        var applyRemoteData = function (items) {
            $scope.todos = items.data;
        };

        loadRemoteData();
    });

