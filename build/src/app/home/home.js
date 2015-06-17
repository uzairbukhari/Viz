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
    'httpServices',
    'placeholders',
    'ui.bootstrap',
    'chart.js'
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
.controller( 'HomeCtrl', function HomeController( $scope, $modal, $interval, HttpServices) {
        $scope.gridsterOptions = {
            margins: [20, 20],
            columns: 20,
            draggable: {
                handle: 'h3',
                stop: function(event, $element, widget) {
                    $scope.saveDashboardData();
                }
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

        $scope.dashboards = [];

        $scope.clear = function () {
            $scope.dashboard.widgets = [];
        };

        $scope.addDashboard = function () {
            $scope.modalDashboardInstance = $modal.open({
                scope: $scope,
                templateUrl: 'home/new_dashboard.tpl.html',
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
                templateUrl: 'home/create_widget.tpl.html',
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
            console.log('dashboard change event trigger');
            $scope.selectedDashboardId = dashId;
            var dashboards = $scope.dashboards;
            $scope.dashboard = $scope.dashboards[0];
            for (var x in dashboards) {
                if (dashboards[x].id == dashId) {
                    $scope.dashboard = $scope.dashboards[x];
                }
            }
            loadDashboard();
        };

        // I load the remote data from the server.
        var loadDashboardList = function () {
            var jsonObj = {
                module: 'dashboard',
                param: '',
                method: 'getList'
            };
            HttpServices.get(jsonObj).then(
                function (response) {
                    $scope.dashboards = response;
                    // init dashboard
                    $scope.selectedDashboardId = $scope.dashboards[0].id;
                    //loadDashboard();
                }
            );
        };

        var loadDashboard = function () {
            var jsonObj = {
                module: 'dashboard',
                method: 'get',
                param: $scope.selectedDashboardId
            };
            HttpServices.get(jsonObj).then(
                function (response) {
                    console.log(response);
                    $scope.dashboard.widgets = response.widgets;
                    loadDashboardData();
                }
            );
        };

        var loadDashboardData = function () {
            var jsonObj = {
                module: 'dashboardData',
                param: $scope.selectedDashboardId
            };

            HttpServices.get(jsonObj).then(
                function (response) {
                    var widgetConfig = response;
                    if(widgetConfig.length == undefined) {
                        widgetConfig = [];
                        widgetConfig.push(response);
                    }
                    if(widgetConfig) {
                        for(var x in widgetConfig) {
                            var widget = _.find($scope.dashboard.widgets, function (widget) {
                                return widget.id == widgetConfig[x].id;
                            });

                            if(widget) {
                                widget.chartType = widgetConfig[x].widgetType;
                                widget.data = widgetConfig[x].data;
                                widget.labels = widgetConfig[x].labels;
                                widget.series = widgetConfig[x].series;
                            }
                        }
                        //widgetRefreshTimer();
                    }
                }
            );
        };

        $scope.saveDashboardData = function () {
            var widgets = $scope.dashboard.widgets, widgetsConf = [], jsonObj;

            _.each(widgets, function (widget) {
                widgetsConf.push({
                    "id": widget.id,
                    "sizeX": widget.sizeX,
                    "sizeY": widget.sizeY,
                    "col": widget.col,
                    "row": widget.row
                });
            });

            jsonObj = {
                module: 'dashboardData',
                param: '',
                data: {
                    "id": $scope.selectedDashboardId,
                    "widgets": widgetsConf
                }
            };

            HttpServices.update(jsonObj).then(function (msg) {

            });
        };

        var widgetRefreshTimer = function () {
            // Starting timer for refreshing widget data
            var stop,
                chunk = 2,
                refreshOne = true;
            $scope.widgetRefresh = function() {
                // Don't start a refresh if we are already refreshing
                if ( angular.isDefined(stop) ) return;

                stop = $interval(function() {
                    var widgets = $scope.dashboard.widgets,
                        idArray = [];

                    for(var x in widgets) {
                        var widgetRefInterval = widgets[x].refreshInterval;
                        if(widgetRefInterval % 2 == 1) {
                            if (widgetRefInterval < chunk ) {
                                widgetRefInterval++;
                                widgetRefInterval = widgetRefInterval * Math.round(chunk / widgetRefInterval);
                            } else {
                                widgetRefInterval++;
                            }
                        }
                        if(widgetRefInterval == 2 || chunk % widgetRefInterval == 0 ) {
                            idArray.push(widgets[x].id);
                        }
                    }
                    chunk+= 2;
                    console.log(idArray.join(','));

                    updateWidget(refreshOne);
                    refreshOne = !refreshOne;
                }, 120000);
            };

            $scope.stopRefresh = function() {
                console.log('in stop refresh');
                if (angular.isDefined(stop)) {
                    $interval.cancel(stop);
                    stop = undefined;
                }
            };

            $scope.resetRefresh = function() {

            };

            $scope.$on('$destroy', function() {
                // Make sure that the interval is destroyed too
                $scope.stopRefresh();
            });

            $scope.widgetRefresh();
        };

        var updateWidget = function (widgetIds) {
            var jsonObj;
            if(widgetIds) {
                jsonObj = {
                    module: 'refreshOne',
                    param: ''
                };
            } else {
                jsonObj = {
                    module: 'refreshTwo',
                    param: ''
                };
            }

            HttpServices.get(jsonObj).then(
                function (items) {
                    var widgetConfig = items.data;
                    if(widgetConfig) {
                        for(var x in widgetConfig) {
                            var widget = _.find($scope.dashboard.widgets, function (widget) {
                                return widget.id == widgetConfig[x].id;
                            });
                            //widget = widgetConfig[x];
                            widget.data = widgetConfig[x].data;
                            widget.labels = widgetConfig[x].labels;
                            widget.series = widgetConfig[x].series;
                        }
                    }
                }
            );
        };

        loadDashboardList();

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

    .controller('CustomWidgetCtrl', function CustomWidgetCtrl($scope, $modal, HttpServices) {
        $scope.remove = function (widget) {
            if(window.confirm('This will remove this widget. Are you sure?')) {
                var jsonObj = {
                    module: 'widget',
                    param: widget.id
                };

                HttpServices.delete(jsonObj).then(function () {
                    $scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
                });
            }
        };

        $scope.openSettings = function (widget) {
            $scope.modalInstance = $modal.open({
                scope: $scope,
                templateUrl: 'home/widget_settings.tpl.html',
                controller: 'WidgetSettingsCtrl',
                resolve: {
                    widget: function () {
                        return widget;
                    }
                }
            });
        };
    })

    .controller('WidgetSettingsCtrl', function WidgetSettingsCtrl($scope,$modal, widget) {
        $scope.widget = widget;

        $scope.form = {
            name: widget.name,
            sizeX: widget.sizeX,
            sizeY: widget.sizeY,
            col: widget.col,
            row: widget.row,
            widget_type: widget.widget_type,
            chartSubTypeSelected: widget.widget_type
        };

        $scope.sizeOptions = [
            {
                id: '1',
                name: '1'
            },
            {
                id: '2',
                name: '2'
            },
            {
                id: '3',
                name: '3'
            },
            {
                id: '4',
                name: '4'
            }];

        switch (widget.widget_type) {
            case "bar":
                $scope.chartSubType = [ { id: 'bar', name: 'bar' }, { id: 'line', name: 'line' }, { id: 'radar', name: 'radar' }];
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
            $scope.form.widget_type = $scope.form.chartSubTypeSelected;
            //$scope.form.chartType = $scope.chartSubTypeSelected;
            angular.extend(widget, $scope.form);
            $scope.modalInstance.close(widget);
        };

    })

    .controller('NewDashboardCtrl', function WidgetSettingsCtrl($scope,$modal, dashboards) {
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
            widget_type: "line"
        };

        $scope.dismiss = function () {
            $scope.modalCreateWidgetInstance.dismiss();
        };

        $scope.remove = function () {
            $scope.modalCreateWidgetInstance.close();
        };

        $scope.submit = function () {
            var widgetConfig = {
                    name: $scope.form.name,
                    sizeX: 5,
                    sizeY: 5,
                    widget_type: $scope.form.widget_type,
                    dashboard_id: "1",
                    col: "0",
                    row: "0"
                },
                jsonObj = {
                    module: 'widget',
                    param: '',
                    data: widgetConfig
                };

            console.log(widgetConfig);
            HttpServices.set(jsonObj).then(function (resp) {
                console.log(resp);
                widgetConfig.id = resp.id;
                $scope.dashboard.widgets.push(widgetConfig);

                $scope.saveDashboardData();
                //angular.extend(widget, $scope.form);
                $scope.modalCreateWidgetInstance.close();
            });
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

