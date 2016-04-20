/* ==========   MessagesViewController   ==========
============================================= */

function MessagesViewController($scope, $rootScope, $http, $location, $window, $timeout) {
	// init left menu
	BaseController.call(this, $scope, $timeout);
	//
	$scope.spinneractive = false;
	$scope.nameUserProfile = "";
	$scope.addressUserProfile = "";
	$scope.urlImageUserProfile = "http://thetechmap.com/uploads/noimage.jpg";
	$scope.init = function(){
		var access_token = JSON.parse(localStorage.getItem('access_token'));
		
		
		// Get all messages by user from server
		if($rootScope.loginByLinkedIn == true)
			$rootScope.userId = "7";
		var dataStore = JSON.parse(localStorage.getItem("messagesByUser"));
		if(dataStore != null || dataStore != undefined){
			$scope.messages = dataStore;
		}
		else{
			getData($rootScope.userId);
		}
		$scope.initMenuView();

		if($rootScope.loginByLinkedIn == true){
			//,siteStandardProfileRequest
			$http.get("https://api.linkedin.com/v1/people/~:(email-address,first-name,last-name,headline,picture-url,location:(name))?format=json&oauth2_access_token=" + access_token)
			.success(function (result) {
				//do what you want
				console.log("User Profile -> " + JSON.stringify(result));
				$scope.dataUserProfile = result;
				var address = $scope.dataUserProfile.location.name;
				console.log('Address ->' +  address);
				$scope.nameUserProfile = $scope.dataUserProfile.firstName + " " + $scope.dataUserProfile.lastName;
				$scope.urlImageUserProfile = $scope.dataUserProfile.pictureUrl;
				$scope.addressUserProfile = address;
				//$location.path("/home");
				
			}).error(function (error) {
				console.log('Error ->' + "Can't get user profile" + error); 
			});
		}
		else{
			$scope.user = $rootScope.userInformation;
			$scope.nameUserProfile = $scope.user.FirstName + " " + $scope.user.LastName;
			if($scope.user.UserPhoto != "" && $scope.user.UserPhoto != null)
				$scope.urlImageUserProfile = $scope.user.UserPhoto;
			$scope.addressUserProfile = $scope.user.City + " , " + $scope.user.Country;
		}
	};
	
	var getData = function(userId){
		$http.get("http://thetechmap.com/api/message/get?userID="+userId)
			.success(function (data) {
				for(i = 0; i < data.length; i++){
					if(data[i] != "" && data[i] != null){
						if(data[i].DatePosted != "" && data[i].DatePosted != null && data[i].DatePosted != undefined){
							var arrayDate = data[i].DatePosted.slice(0,10).split("-");
							data[i].DatePosted = arrayDate[1] + "-" + arrayDate[2] + "-" + arrayDate[0];
						}
						if(data[i].UserPhoto == "" || data[i].UserPhoto == null){
							data[i].UserPhoto = "http://thetechmap.com/uploads/noimage.jpg";
						}
					}
				}
				$scope.messages = data;
				localStorage.setItem("messagesByUser", JSON.stringify($scope.messages));
				console.log("get messages by user successful."); 
			}).error(function (error) {
				console.log('Error: ' + "Can't get data messages by user." + error); 
			});
	};
	
	$scope.GoToUserProfile = function(){
		$location.path("/userprofile");
	};
	
	$scope.GoToHome = function(){
		$location.path("/home");
	};
	
	$scope.GoToMap = function(){
		$location.path("/map");
	};
	
	// show events screen
	$scope.GoToEvents = function(){
		$location.path("/eventsglobal");
	};
	
	// show jobs screen
	$scope.GoToJobs = function(){
		$location.path("/jobs");
	};
	
	// logout app
	$scope.Logout = function(){
		localStorage.clear();
		$location.path("/login");
	};
	
	$rootScope.$on('us-spinner:spin', function(event, key) {
		$scope.spinneractive = true;
    });

    $rootScope.$on('us-spinner:stop', function(event, key) {
		$scope.spinneractive = false;
    });
}