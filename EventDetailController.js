/* ==========   EventDetailViewController   ==========
============================================= */

function EventDetailViewController($scope, $rootScope, $http, $location, $window, $timeout) {
	// init left menu
	BaseController.call(this, $scope, $timeout);
	$scope.longitude = 51.508742;
	$scope.latitude = -0.120850;
	$scope.streetAddress = "";
	$scope.cityAddress = "";
	$scope.init = function(){
		// Retrieve the object from storage
		$scope.eventData = $rootScope.eventDetails;
		if($scope.eventData.Latitude != null && $scope.eventData.Latitude != "")
			$scope.latitude = $scope.eventData.Latitude;
		if($scope.eventData.Longitude != null && $scope.eventData.Longitude != "")
			$scope.longitude = $scope.eventData.Longitude;
		
		if($scope.eventData.Address != "" && $scope.eventData.Address != null){
			$scope.streetAddress = $scope.eventData.Address.slice(0,$scope.eventData.Address.length - 17);
			$scope.cityAddress = $scope.eventData.Address.slice($scope.eventData.Address.length - 17,$scope.eventData.Address.length);
		}
		$scope.initMapView();
	};
	
	// $scope.GoEventsMyBuilding = function () {
		// $location.path("/eventsmybuilding");
	// };
	
	// $scope.GoEventsGlobal = function () {
		// $location.path("/eventsglobal");
	// };
	
	// $scope.GoToHome = function () {
		// $location.path("/home");
	// };
	
	// var me = this;
	// me.init = function () {
		// if (window.initializeMap == undefined) {
		  // window.initializeMap = initializeMap;
		  // loadScript('http://maps.googleapis.com/maps/api/js?v=3&sensor=false&callback=initializeMap',
			// function () {
			  // log('google-loader has been loaded, but not the maps-API ');
			// });
		// }
	// };

	// function loadScript(src, callback) {
		// var script = document.createElement("script");
		// script.type = "text/javascript";
		// if (callback)script.onload = callback;
		// document.getElementsByTagName("head")[0].appendChild(script);
		// script.src = src;
	// }

	// function initializeMap() {
		// if (window.google != undefined) {
		  // doInitializeMap();
		  // setTimeout(function () {
			// doInitializeMap();
		  // }, 1000);

		// } else {
		  // alert("no load google map");
		// }
	// }

	// function doInitializeMap() {
		// var mapProp = {
		  // //center: new google.maps.LatLng(51.508742, -0.120850),
		  // center: new google.maps.LatLng($scope.latitude, $scope.longitude ),
		  // zoom: 5,
		  // mapTypeId: google.maps.MapTypeId.ROADMAP
		// };

		// var map = new google.maps.Map(document.getElementById("map"), mapProp);
	// }

	// me.init();
}