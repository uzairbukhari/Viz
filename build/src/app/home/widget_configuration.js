/**
 * Created by uahmed on 6/18/2015.
 */
app.controller('widgetConfigController', function($scope) {
    /*$scope.widgetConfiguration = {};
    var data = {
        firstName: "John",
        lastName: "Doe",
        testString: "HelloWorld",
        testStringTwo: "Yeh Cheese"
    };
    $scope.widgetConfiguration.firstName = "John";

    $scope.widgetConfiguration = data;*/

    $scope.hello = "yes";
}).directive('myConfiguration', function() {
    return {
        scope: {
            uzairconfig: '='
        },
        link: function(scope, element, attrs){
            scope.contentUrl = 'home/configuration_templates/' + scope.uzairconfig + '_template.tpl.html';
            scope.hello = "Testing";
            attrs.$observe("ver",function(v){
                scope.contentUrl = 'home/configuration_templates/' + v + '_template.tpl.html';
            });
        },
        template: '<div ng-include="contentUrl"></div>'
    };
});