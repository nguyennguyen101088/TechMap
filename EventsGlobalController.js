/* ==========   EventsGlobalViewController   ==========
============================================= */

function EventsGlobalViewController($scope, $rootScope, $http, $location, $window) {
	// $rootScope.dataEventMyCity = [];
	// $rootScope.dataEventMyState = [];
	$scope.init = function(){
		// Retrieve the object from storage
		var dataStore = JSON.parse(localStorage.getItem("eventsGlobal"));
		if(dataStore != null || dataStore != undefined){
			$scope.datasGlobal = dataStore.slice(0, 24);
		}
		else{
			getData();
		}
	};
	
	var getData = function(){
		$http.get("http://thetechmap.com/api/event/get")
			.success(function (data) {
				for(i = 0; i < data.length; i++){
					if(data[i].EventDate != "" || data[i].EventDate != null && data[i].EventDate != undefined){
						var arrayDate = data[i].EventDate.slice(0,10).split("-");
						data[i].EventDate = arrayDate[2] + "-" + arrayDate[1] + "-" + arrayDate[0];
					}
				}
				//$scope.datasGlobal = data;
				localStorage.setItem("eventsGlobal", JSON.stringify(data));
				$scope.datasGlobal = data.slice(0, 24);
				console.log("get data events successful."); 
			}).error(function (data) {
				console.log('Error: ' + "Can't get data events."); 
			});
	};
	
	$scope.GoEventsMyCity = function () {
		$location.path("/eventsmycity");
	};
	
	$scope.GoEventsMyBuilding = function () {
		$location.path("/eventsmystate");
	};
	
	$scope.GoToHome = function () {
		$location.path("/home");
	};
	$scope.GoToEventDetail = function(eventDetails){
		$rootScope.eventDetails = eventDetails;
		$location.path("/eventdetail");
    };
}