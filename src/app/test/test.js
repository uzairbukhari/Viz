angular.module( 'Vizdum.test', [
  'ui.router',
  'placeholders',
  'ui.bootstrap',
    'httpServices',
  'n3-line-chart',
  'nvd3'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'test', {
    url: '/test',
    views: {
      "main": {
        controller: 'TestCtrl',
        templateUrl: 'test/test.tpl.html',
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

.controller( 'TestCtrl', function TestCtrl( $scope, HttpServices ) {
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
          name: "New Widget 3",
          id: widgetId,
          sizeX: 2,
          sizeY: 2,
          body: '',
          hasChart3: !$scope.chart4,
          hasChart4: $scope.chart4,
          minSizeY: "2",
          minSizeX: "1"
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
        console.log($scope.dashboard.widgets);
      }

      var loadChart = function (widgetId) {
        /*var myEl = angular.element(document.querySelector('#' + widgetId));
        myEl.append('<div><linechart data="data" options="options" mode="" width="" height=""></linechart></div>');*/

        /*$scope.data = [
          {
            x: 0,
            val_0: 0.5,
            val_1: 0,
            val_2: 0,
            val_3: 0
          },
          {
            x: 1,
            val_0: 0.993,
            val_1: 3.894,
            val_2: 8.47,
            val_3: 14.347
          },
          {
            x: 2,
            val_0: 1.947,
            val_1: 7.174,
            val_2: 13.981,
            val_3: 19.991
          },
          {
            x: 3,
            val_0: 2.823,
            val_1: 9.32,
            val_2: 14.608,
            val_3: 13.509
          },
          {
            x: 4,
            val_0: 3.587,
            val_1: 9.996,
            val_2: 10.132,
            val_3: 1.167
          },
          {
            x: 5,
            val_0: 4.207,
            val_1: 9.093,
            val_2: 2.117,
            val_3: 15.136
          },
          {
            x: 6,
            val_0: 4.66,
            val_1: 6.755,
            val_2: 6.638,
            val_3: 19.923
          },
          {
            x: 7,
            val_0: 4.927,
            val_1: 3.35,
            val_2: 13.074,
            val_3: 12.625
          },
          {
            x: 8,
            val_0: 4.998,
            val_1: 0.584,
            val_2: 14.942,
            val_3: 2.331
          },
          {
            x: 9,
            val_0: 4.869,
            val_1: 4.425,
            val_2: 11.591,
            val_3: 15.873
          },
          {
            x: 10,
            val_0: 4.546,
            val_1: 7.568,
            val_2: 4.191,
            val_3: 19.787
          },
          {
            x: 11,
            val_0: 4.042,
            val_1: 9.516,
            val_2: 4.673,
            val_3: 11.698
          },
          {
            x: 12,
            val_0: 3.377,
            val_1: 9.962,
            val_2: 11.905,
            val_3: 3.487
          },
          {
            x: 13,
            val_0: 2.578,
            val_1: 8.835,
            val_2: 14.978,
            val_3: 16.557
          },
          {
            x: 14,
            val_0: 1.675,
            val_1: 6.313,
            val_2: 12.819,
            val_3: 19.584
          },
          {
            x: 15,
            val_0: 0.706,
            val_1: 2.794,
            val_2: 6.182,
            val_3: 10.731
          },
          {
            x: 16,
            val_0: 0.292,
            val_1: 1.165,
            val_2: 2.615,
            val_3: 4.63
          },
          {
            x: 17,
            val_0: 1.278,
            val_1: 4.941,
            val_2: 10.498,
            val_3: 17.183
          },
          {
            x: 18,
            val_0: 2.213,
            val_1: 7.937,
            val_2: 14.714,
            val_3: 19.313
          },
          {
            x: 19,
            val_0: 3.059,
            val_1: 9.679,
            val_2: 13.79,
            val_3: 9.728
          },
          {
            x: 20,
            val_0: 3.784,
            val_1: 9.894,
            val_2: 8.049,
            val_3: 5.758
          },
          {
            x: 21,
            val_0: 4.358,
            val_1: 8.546,
            val_2: 0.504,
            val_3: 17.751
          },
          {
            x: 22,
            val_0: 4.758,
            val_1: 5.849,
            val_2: 8.881,
            val_3: 18.977
          },
          {
            x: 23,
            val_0: 4.968,
            val_1: 2.229,
            val_2: 14.155,
            val_3: 8.691
          },
          {
            x: 24,
            val_0: 4.981,
            val_1: 1.743,
            val_2: 14.485,
            val_3: 6.866
          },
          {
            x: 25,
            val_0: 4.795,
            val_1: 5.44,
            val_2: 9.754,
            val_3: 18.259
          },
          {
            x: 26,
            val_0: 4.417,
            val_1: 8.278,
            val_2: 1.616,
            val_3: 18.576
          },
          {
            x: 27,
            val_0: 3.864,
            val_1: 9.809,
            val_2: 7.086,
            val_3: 7.625
          },
          {
            x: 28,
            val_0: 3.156,
            val_1: 9.792,
            val_2: 13.314,
            val_3: 7.951
          },
          {
            x: 29,
            val_0: 2.323,
            val_1: 8.228,
            val_2: 14.89,
            val_3: 18.704
          }
        ];

        $scope.options = {
          stacks: [{axis: "y", series: ["id_0", "id_1", "id_2", "id_3"]}],
          lineMode: "cardinal",
          series: [
            {
              id: "id_0",
              y: "val_0",
              label: "Foo",
              type: "column",
              color: "#1f77b4",
              axis: "y"
            },
            {
              id: "id_1",
              y: "val_1",
              label: "Bar",
              type: "column",
              color: "#ff7f0e",
              axis: "y"
            },
            {
              id: "id_2",
              y: "val_2",
              label: "Baz",
              type: "column",
              color: "#d62728",
              axis: "y"
            },
            {
              id: "id_3",
              y: "val_3",
              label: "Taz",
              type: "column",
              color: "#d26124",
              axis: "y"
            }
          ],
          axes: {x: {type: "linear", key: "x"}, y: {type: "linear"}},
          tension: 0.7,
          tooltip: {mode: "scrubber"},
          drawLegend: true,
          drawDots: true,
          columnsHGap: 5
        };*/
        if($scope.chart4) {
          $scope.options2 = {
            chart: {
              type: 'discreteBarChart',
              height: 450,
              margin : {
                top: 20,
                right: 20,
                bottom: 60,
                left: 55
              },
              x: function(d){return d.label;},
              y: function(d){return d.value;},
              showValues: true,
              valueFormat: function(d){
                return d3.format(',.4f')(d);
              },
              transitionDuration: 500,
              xAxis: {
                axisLabel: 'X Axis'
              },
              yAxis: {
                axisLabel: 'Y Axis',
                axisLabelDistance: 30
              }
            }
          };

          $scope.data2 = [
            {
              key: "Cumulative Return",
              values: [
                {
                  "label" : "A" ,
                  "value" : -29.765957771107
                } ,
                {
                  "label" : "B" ,
                  "value" : 0
                } ,
                {
                  "label" : "C" ,
                  "value" : 32.807804682612
                } ,
                {
                  "label" : "D" ,
                  "value" : 196.45946739256
                } ,
                {
                  "label" : "E" ,
                  "value" : 0.19434030906893
                } ,
                {
                  "label" : "F" ,
                  "value" : -98.079782601442
                } ,
                {
                  "label" : "G" ,
                  "value" : -13.925743130903
                } ,
                {
                  "label" : "H" ,
                  "value" : -5.1387322875705
                }
              ]
            }
          ]
        } else {
          $scope.chart4 = true;

          $scope.options = {
            chart: {
              type: 'pieChart',
              height: 500,
              x: function (d) {
                return d.key;
              },
              y: function (d) {
                return d.y;
              },
              showLabels: true,
              transitionDuration: 500,
              labelThreshold: 0.01,
              legend: {
                margin: {
                  top: 5,
                  right: 35,
                  bottom: 5,
                  left: 0
                }
              }
            }
          };

          $scope.data = [
            {
              key: "One",
              y: 5
            },
            {
              key: "Two",
              y: 2
            },
            {
              key: "Three",
              y: 9
            },
            {
              key: "Four",
              y: 7
            },
            {
              key: "Five",
              y: 4
            },
            {
              key: "Six",
              y: 3
            },
            {
              key: "Seven",
              y: .5
            }
          ];

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
