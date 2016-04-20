/* ==========   CompanyDetailViewController   ==========
============================================= */

function CompanyDetailViewController($scope, $rootScope, $http, $location, $window) {
	$scope.urlImageUserProfile = "http://thetechmap.com/uploads/noimage.jpg";
	$scope.init = function(){
		$scope.company = $rootScope.companyDetail;
		if($scope.company.ImagePath != "" || $scope.company.ImagePath != null){
			$scope.urlImageUserProfile = $scope.company.ImagePath;
		}
	};
	
	$scope.BackToCompanies = function(){
		$location.path("/map");
	};
	$scope.GoToEditCompany = function(){
		showCustomDialog(function(){
			}, "Function is coming...!");
	};
}