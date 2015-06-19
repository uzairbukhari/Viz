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
        // HEADERS
        function getHeaders () {
            return {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "X-Authorization": 'eyJpdiI6IndaeEV6MnFlSDJPM2ZBYmhMZ015SkE9PSIsInZhbHVlIjoiaEZZcVpaY3ZEVXpGQkpFelwvam1TVklcL25Jdm9vYzE2ajZZXC9CSDBqN3FLNzV0emRtZU1jQ0lPbFNZaFFyWThcL3k1ZUx3MDRwZXNpTDZKQVhyaXZoS2p6eVhmemhPdFh3cmI2WldrbHI5ek0xR0lKR3NoM1ZcL1dwc0VHb2hjTXZyWURzUDBaXC9VTUI3YmYraG8rbUFFOTJ2NG5rV01ubFVVMzc2eGVPQ1YrQnBWRE9NdmxrOExONmtyY1BneVpleGxOc0tQSkh3MlRDMkZwdUV0MXpBUGd2d3EwbUJibUpuMG8xZGE5ZmVTd0RFd2szMmpTVDE5cW52U1JXK04xaERpUFVadGhxSUpaYUdFeU1KUFZ4V1NVUG85TjE1VEJNZTZPRTE5alY3ZnU0aDhIcUlkQzhkM1pCNlR3Uk1JQ0VPTEZEcUNGQzdFVzA0SjJOK2piZGRMU3NQSzRHOG85clF0XC9Scm5HeUlUV0xmemp3MmE1RG1CSEZDSzZ3T0lqTXpJaWxGQlU1RTRtMmcyQTYzVm9HeDUySzdQY001Y2ZINUVcL1k0MDUxbWUydjM1VnA5cnFjY3E1OXF6Y3NMMnVJNENhIiwibWFjIjoiYjNiMmJkOTdhZWRiMzdhODZhNjQxYjIxMWRkN2QxM2NlYmRkMjU2ZWEyODRmZTdjN2RkOWEzMDM2MzYxNzJlYSJ9'//getCookie('auth_token')
            }
        }

        function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
            }
            return "";
        }

        // ---

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
                headers: getHeaders()
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
                headers: getHeaders()
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
                headers: getHeaders()
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
                headers: getHeaders()
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