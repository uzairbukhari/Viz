angular.module( 'Vizdum.test3', [
  'ui.router',
  'placeholders',
  'ui.bootstrap',
    'httpServices',
  'n3-line-chart',
  'nvd3',
  'chart.js'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'test3', {
    url: '/test3',
    views: {
      "main": {
        controller: 'TestCtrl3',
        templateUrl: 'test3/test3.tpl.html',
        resolve: {
          test: function() {
            return true;
            /*var deferred = $q.defer();
            deferred.resolve();
            console.log('In resolve');

            return deferred.promise;*/
          }
        }
      }
    },
    data:{ pageTitle: 'Test' }
  });
})

.controller( 'TestCtrl3', function TestCtrl( $scope, HttpServices ) {
      $scope.chart4 = false;

      $scope.gridsterOptions = {
        margins: [20, 20],
        columns: 4,
        draggable: {
          handle: 'h3'
        },
        resizable: {
          enabled: true,
          handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
          start: function(event, $element, widget) {}, // optional callback fired when resize is started,
          resize: function(event, $element, widget) {}, // optional callback fired when item is resized,
          stop: function(event, $element, widget) {
            console.log('resizing complete');
            window.dispatchEvent(new Event('resize'));
          } // optional callback fired when item is finished resizing
        }
      };

      $scope.dashboards = {
        "1": {
          "id": "1",
          "name": "Home",
          "widgets": []
        },
        "2": {
          "id": "2",
          "name": "Other",
          "widgets": []
        }
      };

      $scope.clear = function() {
        $scope.dashboard.widgets = [];
      };

      $scope.addWidget = function() {
        var widgetId = "newWidget3";
        $scope.dashboard.widgets.push({
          name: "New Widget",
          id: widgetId,
          sizeX: 3,
          sizeY: 2,
          body: '',
          hasChart3: !$scope.chart4,
          hasChart4: $scope.chart4,
        });
        loadChart(widgetId);
      };

      $scope.$watch('selectedDashboardId', function(newVal, oldVal) {
        console.log('here');
        if (newVal !== oldVal) {
          $scope.dashboard = $scope.dashboards[newVal];
        } else {
          $scope.dashboard = $scope.dashboards[1];
        }
      });

      // init dashboard
      $scope.selectedDashboardId = '1';

      // I load the remote data from the server.
      var loadRemoteData = function() {
        // The friendService returns a promise.
        var jsonObj = {
          module: 'widgetsConfig',
          param: ''
        };
        HttpServices.get(jsonObj).then(
            function(items) {
              console.log(items);
              applyRemoteData(items);
            }
        );
      };

      var applyRemoteData = function (items) {
        $scope.dashboard.widgets = items.data.widgets;
      };

      loadRemoteData();

      $scope.printJson = function () {
        console.log($scope.dashboard.widgets[0].toString());
      };

      var loadChart = function (widgetId) {
        if($scope.chart4) {
          $scope.labels2 = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
          $scope.series = ['Series A', 'Series B'];
          $scope.data2 =  [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
          ];
        } else {
          $scope.chart4 = true;

          $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
          $scope.series = ['Series A', 'Series B'];
          $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
          ];
          $scope.onClick = function (points, evt) {
            console.log(points, evt);
          };
        }
      }
    })
    .controller('CustomWidgetCtrl', ['$scope', '$modal',
      function($scope, $modal) {

        $scope.remove = function(widget) {
          $scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
        };

        $scope.openSettings = function(widget) {
          $modal.open({
            scope: $scope,
            templateUrl: 'demo/dashboard/widget_settings.html',
            controller: 'WidgetSettingsCtrl',
            resolve: {
              widget: function() {
                return widget;
              }
            }
          });
        };

      }
    ])

    .controller('WidgetSettingsCtrl', ['$scope', '$timeout', '$rootScope', '$modalInstance', 'widget',
      function($scope, $timeout, $rootScope, $modalInstance, widget) {
        $scope.widget = widget;

        $scope.form = {
          name: widget.name,
          sizeX: widget.sizeX,
          sizeY: widget.sizeY,
          col: widget.col,
          row: widget.row
        };

        $scope.sizeOptions = [{
          id: '1',
          name: '1'
        }, {
          id: '2',
          name: '2'
        }, {
          id: '3',
          name: '3'
        }, {
          id: '4',
          name: '4'
        }];

        $scope.dismiss = function() {
          $modalInstance.dismiss();
        };

        $scope.remove = function() {
          $scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
          $modalInstance.close();
        };

        $scope.submit = function() {
          angular.extend(widget, $scope.form);

          $modalInstance.close(widget);
        };

      }
    ])

// helper code
    .filter('object2Array', function() {
      return function(input) {
        var out = [];
        for (var i in input) {
          out.push(input[i]);
        }
        return out;
      }
    });
