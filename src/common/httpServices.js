/**
 * Created by uahmed on 5/18/2015.
 */
    angular.module('httpServices', ['ngResource', 'paths']).service('HttpServices', function ($http, $q, Paths) {
        // Return public API.
        return({
            get: getDataRest,
            set: setDataRest
        });


        // ---
        // PUBLIC METHODS.
        // ---

        function getUrl(module, action) {
            return Paths.getApiPath(module, action);
        }

        // get data from the rest API
        function getDataRest(jsonObj) {
            console.log('in get call');
            var url = getUrl(jsonObj.module, jsonObj.method ? jsonObj.method : 'get');

            var request = $http({
                method: "get",
                url: url,
                params: {
                    action: "get"
                }
            });

            return( request.then( handleSuccess, handleError ) );
        }

        // set data to the Rest API
        function setDataRest( jsonObj ) {
            var url = getUrl(jsonObj.module, 'get');

            var request = $http({
                method: "post",
                url: url,
                params: {
                    action: "add"
                },
                data: jsonObj.data
            });

            return( request.then( handleSuccess, handleError ) );
        }

        // Remove data from the Rest API
        /*function removeFriend( id ) {

            var request = $http({
                method: "delete",
                url: "api/index.cfm",
                params: {
                    action: "delete"
                },
                data: {
                    id: id
                }
            });

            return( request.then( handleSuccess, handleError ) );

        }*/


        // ---
        // PRIVATE METHODS.
        // ---


        // I transform the error response, unwrapping the application dta from
        // the API response payload.
        function handleError( response ) {
            // The API response from the server should be returned in a
            // nomralized format. However, if the request was not handled by the
            // server (or what not handles properly - ex. server error), then we
            // may have to normalize it on our end, as best we can.
            if (
                ! angular.isObject( response.data ) ||
                ! response.data.message
            ) {
                return( $q.reject( "An unknown error occurred." ) );
            }

            // Otherwise, use expected error message.
            return( $q.reject( response.data.message ) );

        }


        // I transform the successful response, unwrapping the application data
        // from the API response payload.
        function handleSuccess( response ) {
            return( response.data );
        }
});