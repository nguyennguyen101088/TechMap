/* ==========   EventsMyStateViewController   ==========
============================================= */

function EventsMyStateViewController($scope, $rootScope, $http, $location, $window) {

	$scope.init = function(){
		// Retrieve the object from storage
		var userState = localStorage.getItem('userState');
		if(userState == null || userState == undefined)
			userState = "Texas";
		//Get all events by state from server	
		$http.get("http://thetechmap.com/api/event/get?state="+userState)
			.success(function (data) {
				for(i = 0; i < data.length; i++){
					if(data[i] != "" && data[i] != null){
						if(data[i].EventDate != "" && data[i].EventDate != null && data[i].EventDate != undefined){
							var arrayDate = data[i].EventDate.slice(0,10).split("-");
							data[i].EventDate = arrayDate[2] + "-" + arrayDate[1] + "-" + arrayDate[0];
						}
					}
				}
				if(data.length > 20){
					$scope.datasMyState = data.slice(0, 19);
				}
				console.log("get data events my state successful."); 
			}).error(function (error) {
				console.log('Error: ' + "Can't get data events my state." + error); 
			});	
		
		//$scope.datasMyState = $rootScope.eventsGlobal;
	};
	
	$scope.GoEventsMyCity = function () {
		$location.path("/eventsmycity");
	};
	
	$scope.GoEventsGlobal = function () {
		$location.path("/eventsglobal");
	};
	
	$scope.GoToHome = function () {
		$location.path("/home");
	};
	
	$scope.GoToEventDetail = function () {
		$location.path("/eventdetail");
	};
	
	$scope.GoToEventDetail = function(eventDetails){
		$rootScope.eventDetails = eventDetails;
		$location.path("/eventdetail");
    };
}