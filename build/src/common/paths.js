/**
 * Created by uahmed on 5/19/2015.
 */
angular.module('paths', []).service('Paths', function () {
    // Return public API.
    var restPaths = {
        todo: {
            get: 'http://demo3670183.mockable.io/get',
            set: 'http://demo3670183.mockable.io/set'
        },
        widgetsConfig: {
            get: 'http://demo3670183.mockable.io/dashboard',
            set: 'http://demo3670183.mockable.io/set'
        },
        pie: {
            get: 'http://demo3670183.mockable.io/pie'
        },
        line: {
            get: 'http://demo3670183.mockable.io/line'
        },
        bar: {
            get: 'http://demo3670183.mockable.io/bar'
        },
        refreshOne: {
            get: 'http://demo3670183.mockable.io/refreshOne'
        },
        refreshTwo: {
            get: 'http://demo3670183.mockable.io/refreshTwo'
        },
        dashboard: {
            getList: 'http://api.vizdum.com/dashboards',
            get: 'http://api.vizdum.com/dashboards/1'
        },
        dashboardData: {
            get: 'http://api.vizdum.com/data/dashboard/1',
            put: 'http://api.vizdum.com/dashboards/1'
        },
        widget: {
            get: 'http://api.vizdum.com/dashboards/1/widgets/2',
            delete: 'http://api.vizdum.com/data/widget/1',
            set: 'http://api.vizdum.com/dashboards/1/widgets',
            put: 'http://api.vizdum.com/dashboards/1/widgets/11'
        }
    };

    return({
        getApiPath: getRestApiPath
    });

    function getRestApiPath(module, action) {
        var moduleKey = restPaths[module];
        if(moduleKey && moduleKey[action]) {
            return moduleKey[action];
        }
        else
            return undefined;
    }
});