/* ==========   JobDetailViewController   ==========
============================================= */

function JobDetailViewController($scope, $rootScope, $http, $location, $window) {
	$scope.urlImageCompany = "http://thetechmap.com/uploads/nologo.jpg";
	$scope.init = function(){
		$scope.job = JSON.parse(localStorage.getItem("JobDetail"));
		if($scope.job.Logo != "" || $scope.job.Logo != null){
			$scope.urlImageCompany = $scope.job.Logo;
		}
	};
	
	$scope.GoToEditJob = function(){
		showCustomDialog(function(){
			}, "Function is coming...!");
	};
}