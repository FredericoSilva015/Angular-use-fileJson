var app = angular.module('app', ['ngSanitize']);

app.factory('terms', function($http) {
    var obj = {
        content: null
    };

    $http.get('terms.json').success(function(data) {
        obj.content = data;
    });

    return obj;
});
app.filter('check', ['$sce', function($sce) {
    return function(obj) {
        if (angular.isObject(obj)) {
            var nested = '<li>' + obj.content_main + '</li>';
            if ('subcontent' in obj) {
                nested += '<ul>';
                angular.forEach(obj.subcontent, function(item) {
                    nested += '<li>' + item + '</li>';
                });
                nested += '</ul>';
            }

            return nested;
        }
        return obj;
    };
}]);

app.controller('myCtrl', function($scope, terms) {
    $scope.data = terms;
    var use = $scope.data;
    console.log($scope.data);
});
