/**
 * Created by uahmed on 5/19/2015.
 */
angular.module('paths', []).service('Paths', function () {
    // Return public API.
    var baseUrl = 'http://api.vizdum.com/',
                  // 'http://10.164.25.42:8088/Vizdum_api/public/',
        restPaths = {
            dashboard: {
                getList: 'dashboards',
                get: 'dashboards/',
                set: 'dashboards'
            },
            dashboardData: {
                get: 'data/dashboard/',
                put: 'dashboards/'
            },
            widget: {
                get: 'data/widget/',        // {dashboard_id}/widgets/{widget_id}
                delete: 'dashboards/',               // {dashboard_id}/widgets/{widget_id}
                set: 'dashboards/',                   // {dashboard_id}/widgets
                put: 'dashboards/1/widgets/11'        // {dashboard_id}/widgets/{widget_id}
            }
        };

    return({
        getApiPath: getRestApiPath
    });

    function getRestApiPath(module, action) {
        var moduleKey = restPaths[module];
        if(moduleKey && moduleKey[action]) {
            return baseUrl + moduleKey[action];
        }
        else
            return undefined;
    }
});