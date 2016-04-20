/* ==========   UserProfileViewController   ==========
============================================= */

function UserProfileViewController($scope, $rootScope, $http, $location, $window) {
	$scope.init = function(){
		if($rootScope.isGoToUserProfile == true){
			var userID = localStorage.getItem('userID');
			$http.get("http://thetechmap.com/api/account/get?userID="+userID)
			.success(function (data) {
				$scope.member = data;
				localStorage.setItem('UserInformation', JSON.stringify($scope.member));
				console.log("Data -> " + data);
				console.log("get user information from server successful."); 
				$rootScope.isGoToUserProfile == false;
				if($scope.member != null && $scope.member != ""){
					if($scope.member.ProfilePhoto == "" || $scope.member.ProfilePhoto == null){
						$scope.urlImageUserProfile = "http://thetechmap.com/uploads/noimage.jpg";
					}
					else{
						$scope.urlImageUserProfile = "http://thetechmap.com/uploads/"+$scope.member.ProfilePhoto;
					}
					if($scope.member.LinkedInUrl == "" || $scope.member.LinkedInUrl == null){
						$scope.urlLinkedInUserProfile = "https://www.linkedin.com/";
					}
					else{
						$scope.urlLinkedInUserProfile = "https://www.linkedin.com/"+$scope.member.LinkedInUrl;
					}
				}
				else{
					$scope.urlImageUserProfile = "http://thetechmap.com/uploads/noimage.jpg";
					$scope.urlLinkedInUserProfile = "https://www.linkedin.com/";
				}
			}).error(function (error) {
				console.log('Error: ' + "Can't get user information from server." + error); 
			});
		}
		else{
			$scope.member = $rootScope.memberDetail;
			localStorage.setItem('UserInformation', $scope.member);
			if($scope.member.ProfilePhoto == "" || $scope.member.ProfilePhoto == null){
				$scope.urlImageUserProfile = "http://thetechmap.com/uploads/noimage.jpg";
			}
			else{
				$scope.urlImageUserProfile = $scope.member.ProfilePhoto;
			}
			if($scope.member.LinkedInUrl == "" || $scope.member.LinkedInUrl == null){
				$scope.urlLinkedInUserProfile = "https://www.linkedin.com/";
			}
			else{
				$scope.urlLinkedInUserProfile = "https://www.linkedin.com/"+$scope.member.LinkedInUrl;
			}
		}
	};
	
	$scope.BackToMembers = function(){
		$location.path("/members");
	};
	$scope.GoToEditProfile = function(){
		$location.path("/edituserprofile");
	};
}