/**
 * Created by uahmed on 5/18/2015.
 */
    angular.module('httpServices', ['ngResource', 'paths']).service('HttpServices', function ($http, $q, Paths) {
        // Return public API.
        return({
            get: getDataRest,
            set: setDataRest,
            update: updateDataRest,
            delete: removeDataRest
        });


        // ---
        // PUBLIC METHODS.
        // ---

        function getUrl(module, action) {
            return Paths.getApiPath(module, action);
        }

        // get data from the rest API
        function getDataRest(jsonObj) {
            jsonObj.method = jsonObj.method ? jsonObj.method : 'get';
            var url = getUrl(jsonObj.module, jsonObj.method);

            if(jsonObj.method == "get") {
                url += jsonObj.param;
            }

            var request = $http({
                method: "get",
                url: url,
                //params: jsonObj.param,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    "X-Authorization": "eyJpdiI6Inc3K2tPaUV1bCs0OE9SejA5amFYVXc9PSIsInZhbHVlIjoiSDFJV3k5WDk3V0dEUURZcnhUcWJYcmNKSnlNYTZ0WG1pK2E1R3NDSjNwZHNNUHkxYjg1d0ZKWWR1cGo4SFFnUkc3SEUzaE1xUjY1XC82NTlRaFAwSE5MVkdrRnNpTExGeDhTV3hYYXkxTWJBeHVSa3Z1ZVIweDBEUmtrdnNXcGlwTHU1VkdNM1c0YVQybmRMbVM5ZkZVOXQrXC9yVVRCdDlPK1lFYkZJY2NHTHRTY0RqOHJwcTdSNjQrTWQ1eHZ3TzhkWW0yUHl0RmlEczlkQlFqc1Y1YlNpc0ozSXpaUURYWm9sUmpaWk1jVEhObU5mVU5FSFwvSUp6Wm9nTHo2cTh1dE1FR2VaM2JVNVd1TzJsMEtkS1JwMnhNMnV4WXRcL2VTSVpHUHdrTlZLUnZ5TjRSY1hVTDRjTERwaUdob1B3anNOTnNkMWQ2d3JZSzhOQ3hWaW1cL2JwZE9TWkYyWFJKOEtQenY5UUZWbUhtZzhoQXpZcElOXC8ydlpHXC9Ra09OUUpINVwvUmlnMGN4MzA4aFQ0OUlhXC9lTzlQNXdHcHNRWklMYXRaWFkxR25oZlFKRWdlYTRjYzlcLzJWS0duUlNGUWhKUTciLCJtYWMiOiI5YTk4NTZkM2E5NjFlZWVjMGI0MjJiNDY0MzljMGU5NjkyZjM0MmIyNTY0YzNjY2I4M2FhNTljNWFlYzRmMDk2In0="
                }
            });

            return( request.then( handleSuccess, handleError ) );
        }

        // set data to the Rest API
        function setDataRest( jsonObj ) {
            var url = getUrl(jsonObj.module, 'set');

            if(jsonObj.param) {
                url += jsonObj.param;
            }

            var request = $http({
                method: "post",
                url: url,
                params: {
                    action: "add"
                },
                data: jsonObj.data,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    "X-Authorization": "eyJpdiI6Inc3K2tPaUV1bCs0OE9SejA5amFYVXc9PSIsInZhbHVlIjoiSDFJV3k5WDk3V0dEUURZcnhUcWJYcmNKSnlNYTZ0WG1pK2E1R3NDSjNwZHNNUHkxYjg1d0ZKWWR1cGo4SFFnUkc3SEUzaE1xUjY1XC82NTlRaFAwSE5MVkdrRnNpTExGeDhTV3hYYXkxTWJBeHVSa3Z1ZVIweDBEUmtrdnNXcGlwTHU1VkdNM1c0YVQybmRMbVM5ZkZVOXQrXC9yVVRCdDlPK1lFYkZJY2NHTHRTY0RqOHJwcTdSNjQrTWQ1eHZ3TzhkWW0yUHl0RmlEczlkQlFqc1Y1YlNpc0ozSXpaUURYWm9sUmpaWk1jVEhObU5mVU5FSFwvSUp6Wm9nTHo2cTh1dE1FR2VaM2JVNVd1TzJsMEtkS1JwMnhNMnV4WXRcL2VTSVpHUHdrTlZLUnZ5TjRSY1hVTDRjTERwaUdob1B3anNOTnNkMWQ2d3JZSzhOQ3hWaW1cL2JwZE9TWkYyWFJKOEtQenY5UUZWbUhtZzhoQXpZcElOXC8ydlpHXC9Ra09OUUpINVwvUmlnMGN4MzA4aFQ0OUlhXC9lTzlQNXdHcHNRWklMYXRaWFkxR25oZlFKRWdlYTRjYzlcLzJWS0duUlNGUWhKUTciLCJtYWMiOiI5YTk4NTZkM2E5NjFlZWVjMGI0MjJiNDY0MzljMGU5NjkyZjM0MmIyNTY0YzNjY2I4M2FhNTljNWFlYzRmMDk2In0="
                }
            });

            return( request.then( handleSuccess, handleError ) );
        }

        // update data to the Rest API
        function updateDataRest( jsonObj ) {
            var url = getUrl(jsonObj.module, 'put');
            if(jsonObj.param) {
                url += jsonObj.param;
            }

            var request = $http({
                method: "put",
                url: url,
                params: {
                    action: "edit"
                },
                data: jsonObj.data,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    "X-Authorization": "eyJpdiI6Inc3K2tPaUV1bCs0OE9SejA5amFYVXc9PSIsInZhbHVlIjoiSDFJV3k5WDk3V0dEUURZcnhUcWJYcmNKSnlNYTZ0WG1pK2E1R3NDSjNwZHNNUHkxYjg1d0ZKWWR1cGo4SFFnUkc3SEUzaE1xUjY1XC82NTlRaFAwSE5MVkdrRnNpTExGeDhTV3hYYXkxTWJBeHVSa3Z1ZVIweDBEUmtrdnNXcGlwTHU1VkdNM1c0YVQybmRMbVM5ZkZVOXQrXC9yVVRCdDlPK1lFYkZJY2NHTHRTY0RqOHJwcTdSNjQrTWQ1eHZ3TzhkWW0yUHl0RmlEczlkQlFqc1Y1YlNpc0ozSXpaUURYWm9sUmpaWk1jVEhObU5mVU5FSFwvSUp6Wm9nTHo2cTh1dE1FR2VaM2JVNVd1TzJsMEtkS1JwMnhNMnV4WXRcL2VTSVpHUHdrTlZLUnZ5TjRSY1hVTDRjTERwaUdob1B3anNOTnNkMWQ2d3JZSzhOQ3hWaW1cL2JwZE9TWkYyWFJKOEtQenY5UUZWbUhtZzhoQXpZcElOXC8ydlpHXC9Ra09OUUpINVwvUmlnMGN4MzA4aFQ0OUlhXC9lTzlQNXdHcHNRWklMYXRaWFkxR25oZlFKRWdlYTRjYzlcLzJWS0duUlNGUWhKUTciLCJtYWMiOiI5YTk4NTZkM2E5NjFlZWVjMGI0MjJiNDY0MzljMGU5NjkyZjM0MmIyNTY0YzNjY2I4M2FhNTljNWFlYzRmMDk2In0="
                }
            });

            return( request.then( handleSuccess, handleError ) );
        }

        // Remove data from the Rest API
        function removeDataRest( jsonObj ) {
            var url = getUrl(jsonObj.module, 'delete');
            if(jsonObj.param) {
                url += jsonObj.param;
            }

            var request = $http({
                method: "DELETE",
                url: url,
                params: {
                    action: "DELETE"
                },
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    "X-Authorization": "eyJpdiI6Inc3K2tPaUV1bCs0OE9SejA5amFYVXc9PSIsInZhbHVlIjoiSDFJV3k5WDk3V0dEUURZcnhUcWJYcmNKSnlNYTZ0WG1pK2E1R3NDSjNwZHNNUHkxYjg1d0ZKWWR1cGo4SFFnUkc3SEUzaE1xUjY1XC82NTlRaFAwSE5MVkdrRnNpTExGeDhTV3hYYXkxTWJBeHVSa3Z1ZVIweDBEUmtrdnNXcGlwTHU1VkdNM1c0YVQybmRMbVM5ZkZVOXQrXC9yVVRCdDlPK1lFYkZJY2NHTHRTY0RqOHJwcTdSNjQrTWQ1eHZ3TzhkWW0yUHl0RmlEczlkQlFqc1Y1YlNpc0ozSXpaUURYWm9sUmpaWk1jVEhObU5mVU5FSFwvSUp6Wm9nTHo2cTh1dE1FR2VaM2JVNVd1TzJsMEtkS1JwMnhNMnV4WXRcL2VTSVpHUHdrTlZLUnZ5TjRSY1hVTDRjTERwaUdob1B3anNOTnNkMWQ2d3JZSzhOQ3hWaW1cL2JwZE9TWkYyWFJKOEtQenY5UUZWbUhtZzhoQXpZcElOXC8ydlpHXC9Ra09OUUpINVwvUmlnMGN4MzA4aFQ0OUlhXC9lTzlQNXdHcHNRWklMYXRaWFkxR25oZlFKRWdlYTRjYzlcLzJWS0duUlNGUWhKUTciLCJtYWMiOiI5YTk4NTZkM2E5NjFlZWVjMGI0MjJiNDY0MzljMGU5NjkyZjM0MmIyNTY0YzNjY2I4M2FhNTljNWFlYzRmMDk2In0="
                }
            });

            return( request.then( handleSuccess, handleError ) );

        }


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