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