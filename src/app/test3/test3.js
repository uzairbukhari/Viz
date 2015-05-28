angular.module( 'Vizdum.test3', [
  'ui.router',
  'placeholders',
  'ui.bootstrap',
  'httpServices',
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

    .controller( 'TestCtrl3', function TestCtrl( $scope, $modal, HttpServices ) {
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
                start: function (event, $element, widget) {
                }, // optional callback fired when resize is started,
                resize: function (event, $element, widget) {
                }, // optional callback fired when item is resized,
                stop: function (event, $element, widget) {
                    console.log('resizing complete');
                    window.dispatchEvent(new Event('resize'));
                } // optional callback fired when item is finished resizing
            }
        };

        $scope.dashboards = [
            {
                "id": "1",
                "name": "Home",
                "widgets": []
            },
            {
                "id": "2",
                "name": "Other",
                "widgets": []
            }
        ];

        $scope.clear = function () {
            $scope.dashboard.widgets = [];
        };

        $scope.addDashboard = function () {
            $scope.modalDashboardInstance = $modal.open({
                scope: $scope,
                templateUrl: 'test3/new_dashboard.tpl.html',
                controller: 'NewDashboardCtrl',
                resolve: {
                    dashboards: function () {
                        return $scope.dashboards;
                    }
                }
            });
        };

        $scope.addWidget = function () {
            $scope.modalCreateWidgetInstance = $modal.open({
                scope: $scope,
                templateUrl: 'test3/create_widget.tpl.html',
                controller: 'CreateWidgetCtrl',
                resolve: {
                    dashboard: function () {
                        return $scope.dashboard;
                    }
                }
            });
        };

        $scope.$watch('selectedDashboardId', function (newVal, oldVal) {
            $scope.selectDashboard(newVal);
        });
        $scope.selectDashboard = function (dashId) {
            console.log('In here');
            $scope.selectedDashboardId = dashId;
            var dashboards = $scope.dashboards;
            $scope.dashboard = $scope.dashboards[0];
            for (var x in dashboards) {
                if (dashboards[x].id == dashId) {
                    $scope.dashboard = $scope.dashboards[x];
                }
            }
        };

        // init dashboard
        $scope.selectedDashboardId = '1';

        // I load the remote data from the server.
        var loadRemoteData = function () {
            // The friendService returns a promise.
            var jsonObj = {
                module: 'widgetsConfig',
                param: ''
            };
            HttpServices.get(jsonObj).then(
                function (items) {
                    console.log(items);
                    applyRemoteData(items);
                }
            );
        };

        var applyRemoteData = function (items) {
            $scope.dashboard.widgets = items.data;
        };

        loadRemoteData();

        $scope.printJson = function () {
            console.log($scope.dashboard.widgets);
            var jsonObj = {
                module: 'widgetsConfig',
                param: '',
                data: $scope.dashboard.widgets
            };

            HttpServices.set(jsonObj).then(function (msg) {
                console.log(msg);
                $scope.todos.push(jsonObj.data);
                $scope.todoText = " ";
            });
        };
    })
    .controller('CustomWidgetCtrl', function CustomWidgetCtrl($scope, $modal) {
        $scope.remove = function (widget) {
            $scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
        };

        $scope.openSettings = function (widget) {
            $scope.modalInstance = $modal.open({
                scope: $scope,
                templateUrl: 'test3/widget_settings.tpl.html',
                controller: 'WidgetSettingsCtrl',
                resolve: {
                    widget: function () {
                        return widget;
                    }
                }
            });
        };

    })

    .controller('WidgetSettingsCtrl', function WidgetSettingsCtrl($scope,$modal, widget, HttpServices) {
      $scope.widget = widget;

        $scope.form = {
          name: widget.name,
          sizeX: widget.sizeX,
          sizeY: widget.sizeY,
          col: widget.col,
          row: widget.row,
          chartType: widget.chartType,
            chartSubTypeSelected: widget.chartType
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

        switch (widget.chartType) {
            case "bar":
                $scope.chartSubType = [ { id: 'bar', name: 'bar' }];
                break;
            case "line":
                $scope.chartSubType = [ { id: 'line', name: 'line' }];
                break;
            case "pie":
            case "doughnut":
            case "polar-area":
                $scope.chartSubType = [ { id: 'pie', name: 'pie' }, { id: 'doughnut', name: 'doughnut' }, { id: 'polar-area', name: 'polar-area' }];
                break;
        }

        $scope.dismiss = function() {
          $scope.modalInstance.dismiss();
        };

        $scope.remove = function() {
          $scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
          $scope.modalInstance.close();
        };

        var applyRemoteData = function (item) {
          var widgetChart = item.data;
          widget.data = widgetChart.data;
          widget.series = widgetChart.series;
          widget.labels = widgetChart.labels;
          angular.extend(widget, $scope.form);
          $scope.modalInstance.close(widget);
        };

        $scope.submit = function() {
            console.log($scope.form.chartSubTypeSelected);
            $scope.form .chartType = $scope.form.chartSubTypeSelected;
            //$scope.form.chartType = $scope.chartSubTypeSelected;
            angular.extend(widget, $scope.form);
            $scope.modalInstance.close(widget);
          /*var jsonObj = {
            module: $scope.form.chartType,
            param: ''
          };
          HttpServices.get(jsonObj).then(
              function(item) {
                applyRemoteData(item);
              }
          );*/
        };

      })

    .controller('NewDashboardCtrl', function WidgetSettingsCtrl($scope,$modal, dashboards, HttpServices) {
        $scope.form = {
            name: ""
        };

        $scope.dismiss = function () {
            $scope.modalDashboardInstance.dismiss();
        };

        $scope.remove = function () {
            $scope.modalDashboardInstance.close();
        };

        $scope.submit = function () {
            var newDashboardId = $scope.form.name + "_" + Math.floor((Math.random() * 100) + 1);
            dashboards.push({
                "id": newDashboardId,
                "name": $scope.form.name,
                "widgets": []
            });
            $scope.selectedDashboardId = newDashboardId;
            $scope.selectDashboard($scope.selectedDashboardId);
            $scope.dismiss();
        };

    })

    .controller('CreateWidgetCtrl', function WidgetSettingsCtrl($scope,$modal, dashboard, HttpServices) {
        $scope.form = {
            name: "New Widget",
            chartType: "line"
        };

        $scope.dismiss = function () {
            $scope.modalCreateWidgetInstance.dismiss();
        };

        $scope.remove = function () {
            $scope.modalCreateWidgetInstance.close();
        };

        var applyRemoteData = function (item) {
            var newWidgetId = "widget_" + Math.floor((Math.random() * 100) + 1),
                widgetChart = item.data;

            $scope.dashboard.widgets.push({
                name: $scope.form.name,
                id: newWidgetId,
                sizeX: 2,
                sizeY: 2,
                chartType: $scope.form.chartType,
                data: widgetChart.data,
                series: widgetChart.series,
                labels: widgetChart.labels
            });

            //angular.extend(widget, $scope.form);
            $scope.modalCreateWidgetInstance.close();
        };

        $scope.submit = function () {
            var jsonObj = {
                module: $scope.form.chartType,
                param: ''
            };
            HttpServices.get(jsonObj).then(
                function(item) {
                    applyRemoteData(item);
                }
            );
        };

    })
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
