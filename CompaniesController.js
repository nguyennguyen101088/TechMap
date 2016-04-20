/* ==========   CompaniesViewController   ==========
============================================= */

function CompaniesViewController($scope, $rootScope, $http, $location, $window) {
	$scope.init = function(){
		getData();
	}
	
	var getData = function(){
		// Get all companies from server
		$http.get("http://thetechmap.com/api/company/get")
			.success(function (data) {	
				$scope.companies = data;
				console.log("get companies successful."); 
			}).error(function (error) {
				console.log('Error: ' + "Can't get data companies." + error); 
			});
	};
	
	$scope.GoToCompanyDetail = function(companyInfor){
		$rootScope.companyInfors = companyInfor;
		//$location.path("/userprofile");
    };
	$scope.GoToMessages = function () {
		$location.path("/messages");
	};
	
	$scope.GoToHome = function () {
		$location.path("/home");
	};
}