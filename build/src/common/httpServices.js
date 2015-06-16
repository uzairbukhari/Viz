/**
 * Created by uahmed on 5/18/2015.
 */
    angular.module('httpServices', ['ngResource', 'paths']).service('HttpServices', function ($http, $q, Paths) {
        // Return public API.
        return({
            get: getDataRest,
            set: setDataRest,
            update: updateDataRest
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
                //params: jsonObj.param,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    "X-Authorization": "eyJpdiI6ImVyY1IyczEwd0RtelZwXC93XC92Rk1kZz09IiwidmFsdWUiOiJBckFCQ1NpbjhkYmxKSHdpbm9aT0wyZHVnSFdOaW1helcza1BBMEU5eUkwamxcL3J2eGZicFgrZE9tXC9kUERSd01CNUxFd2grcVBzXC9qM3FGYjBEZE1RV2JjRzU1bTd2V2h6SlRaZFNId01GdUZIZjRsWGt6ZkVTcXJTZ0V1V0xJQnRKbEFwNVhcL1Z6S2pFOG5pTXpxY3hLRG9McU95cXVlVDBza2FXaFFTSTZxbVhzUzlnb1ExaE5Hc3ZGeW0wdWxwM1dac2VNYWJBT0RuQ2lxR012Wml6b01vc3d0S2hlS05yTm5vRnNGRjZQUlphZVlTUjIzM3RWK2JUN29yV3VuZmV3RndVSFhRT0p6QlwvUzh1cDZ2QmRpZHE5enFJRWtqT2RPbGJWVnZYWTZnd1BwaTFGVUxxbmhxbTNYRnVKQ25iVXNscTZGZzU1b0tyNmpqbmp4M0c2ZWw3S1pKWWNpWEZWaVdGVG8xcW82aGVGdlBHWU56aUpLSkpHbFpjbk9iYU1PdnNTWm9TWFZRdHNSdm5zRnVobUIrcFFDNFhSaXcreklaVU1PQ3NZZlwvTlRHUVE1TEFRYStwajNQK3ZaMGMyIiwibWFjIjoiOWM4YjZhOGVlZjdjYzllNDg5MGRmYzUxYmUwYjFjYWIzYTBjNDVkMDg3ZGEwZDA1MjU0ZWIyN2MxMWE5ZWExOCJ9"
                }
            });

            return( request.then( handleSuccess, handleError ) );
        }

        // set data to the Rest API
        function setDataRest( jsonObj ) {
            var url = getUrl(jsonObj.module, 'set');

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
                    "X-Authorization": "eyJpdiI6ImVyY1IyczEwd0RtelZwXC93XC92Rk1kZz09IiwidmFsdWUiOiJBckFCQ1NpbjhkYmxKSHdpbm9aT0wyZHVnSFdOaW1helcza1BBMEU5eUkwamxcL3J2eGZicFgrZE9tXC9kUERSd01CNUxFd2grcVBzXC9qM3FGYjBEZE1RV2JjRzU1bTd2V2h6SlRaZFNId01GdUZIZjRsWGt6ZkVTcXJTZ0V1V0xJQnRKbEFwNVhcL1Z6S2pFOG5pTXpxY3hLRG9McU95cXVlVDBza2FXaFFTSTZxbVhzUzlnb1ExaE5Hc3ZGeW0wdWxwM1dac2VNYWJBT0RuQ2lxR012Wml6b01vc3d0S2hlS05yTm5vRnNGRjZQUlphZVlTUjIzM3RWK2JUN29yV3VuZmV3RndVSFhRT0p6QlwvUzh1cDZ2QmRpZHE5enFJRWtqT2RPbGJWVnZYWTZnd1BwaTFGVUxxbmhxbTNYRnVKQ25iVXNscTZGZzU1b0tyNmpqbmp4M0c2ZWw3S1pKWWNpWEZWaVdGVG8xcW82aGVGdlBHWU56aUpLSkpHbFpjbk9iYU1PdnNTWm9TWFZRdHNSdm5zRnVobUIrcFFDNFhSaXcreklaVU1PQ3NZZlwvTlRHUVE1TEFRYStwajNQK3ZaMGMyIiwibWFjIjoiOWM4YjZhOGVlZjdjYzllNDg5MGRmYzUxYmUwYjFjYWIzYTBjNDVkMDg3ZGEwZDA1MjU0ZWIyN2MxMWE5ZWExOCJ9"
                }
            });

            return( request.then( handleSuccess, handleError ) );
        }

        // update data to the Rest API
        function updateDataRest( jsonObj ) {
            var url = getUrl(jsonObj.module, 'put');

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
                    "X-Authorization": "eyJpdiI6ImVyY1IyczEwd0RtelZwXC93XC92Rk1kZz09IiwidmFsdWUiOiJBckFCQ1NpbjhkYmxKSHdpbm9aT0wyZHVnSFdOaW1helcza1BBMEU5eUkwamxcL3J2eGZicFgrZE9tXC9kUERSd01CNUxFd2grcVBzXC9qM3FGYjBEZE1RV2JjRzU1bTd2V2h6SlRaZFNId01GdUZIZjRsWGt6ZkVTcXJTZ0V1V0xJQnRKbEFwNVhcL1Z6S2pFOG5pTXpxY3hLRG9McU95cXVlVDBza2FXaFFTSTZxbVhzUzlnb1ExaE5Hc3ZGeW0wdWxwM1dac2VNYWJBT0RuQ2lxR012Wml6b01vc3d0S2hlS05yTm5vRnNGRjZQUlphZVlTUjIzM3RWK2JUN29yV3VuZmV3RndVSFhRT0p6QlwvUzh1cDZ2QmRpZHE5enFJRWtqT2RPbGJWVnZYWTZnd1BwaTFGVUxxbmhxbTNYRnVKQ25iVXNscTZGZzU1b0tyNmpqbmp4M0c2ZWw3S1pKWWNpWEZWaVdGVG8xcW82aGVGdlBHWU56aUpLSkpHbFpjbk9iYU1PdnNTWm9TWFZRdHNSdm5zRnVobUIrcFFDNFhSaXcreklaVU1PQ3NZZlwvTlRHUVE1TEFRYStwajNQK3ZaMGMyIiwibWFjIjoiOWM4YjZhOGVlZjdjYzllNDg5MGRmYzUxYmUwYjFjYWIzYTBjNDVkMDg3ZGEwZDA1MjU0ZWIyN2MxMWE5ZWExOCJ9"
                }
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