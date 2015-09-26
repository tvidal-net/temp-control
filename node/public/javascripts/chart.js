google.setOnLoadCallback(function() {
    angular.bootstrap(document.body, ['temp-control']);
});

angular.module('temp-control', ['google-chart']).controller('IndexCtrl',
        ['$scope', '$http', function($scope, $http) {
    
    var data = new google.visualization.DataTable({ cols: [
        { id: "timestamp", label: "Date/Time", type: "datetime" },
        { id: "temp", label: "Temperature", type: "number" }
    ]});

    var max = chartData.length ? Number.MIN_SAFE_INTEGER : 0;
    var min = chartData.length ? Number.MAX_SAFE_INTEGER : 0;
    var sum = 0;

    chartData.forEach(function(value) {
        data.addRow([new Date(value.timestamp), value.temp]);
        if (value.temp > max) {
            max = value.temp;
        }
        if (value.temp < min) {
            min = value.temp;
        }
        sum += value.temp;
    });

    $scope.temperatures = {
        dataTable: data,
        title: 'Temperatures',
        max: max.toFixed(2),
        min: min.toFixed(2),
        avg: chartData.length ? (sum / chartData.length).toFixed(2) : 0
    }

    $scope.fan_status = fan_status;

    $scope.fan = function(clickEvent) {
        $http.put('api/fan', { fan_status: !$scope.fan_status }).then(function(response) {
            $scope.fan_status = response.data.fan_status;
        });
    }

    $scope.test = function(clickEvent) {
        var dataTable = $scope.temperatures.dataTable;
        for (i = 0; i < dataTable.getNumberOfRows(); i++) {
            dataTable.setValue(i, 1, $scope.temperatures.avg);
        }
        $scope.temperatures.drawChart();
    }

}]);

angular.module('google-chart', []).directive('googleChart',
        function() {

    return {
        restrict: 'A',
        link: function($scope, $elem, $attr) {
            var dataTable = $scope[$attr.ngModel].dataTable;

            var googleChart = new google.visualization[$attr.googleChart]($elem[0]);
            ($scope[$attr.ngModel].drawChart = function() {

                var options = {
                    legend: { position: 'in' },
                    animation: { duration: 600, easing: 'out', startup: true },
                    curveType: 'function'
                };

                if($scope[$attr.ngModel].title) {
                    options.title = $scope[$attr.ngModel].title;
                }

                googleChart.draw(dataTable, options);

            })();
        }
     };
});
