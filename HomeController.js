/* ==========   HomeViewController   ==========
 ============================================= */

function HomeViewController($scope, $rootScope, $http, $location, $window, $timeout) {
	// init left menu
	BaseController.call(this, $scope, $timeout);
	//
	$scope.nameUserProfile = "";
	$scope.addressUserProfile = "";
	$scope.urlImageUserProfile = "http://thetechmap.com/uploads/noimage.jpg";
	
	$rootScope.isGoToUserProfile = false;
	$scope.isLike = false;
	
	$scope.messageIdLiked = [];
	
	$scope.init = function(){
		
		var dataStore = JSON.parse(localStorage.getItem("socialMessages"));
		if(dataStore != null || dataStore != undefined){
			$scope.messages = dataStore;
		}
		else{
			getData();
		}
		
		$scope.initMenuView();
		
		if($rootScope.loginByLinkedIn == true){
			var access_token = JSON.parse(localStorage.getItem('access_token'));
			console.log("access_token" + access_token);
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
			//$scope.urlImageUserProfile = $scope.user.ProfilePhoto;
			$scope.addressUserProfile = $scope.user.City + " , " + $scope.user.Country;
		}
	};
	
	// Get social messages from server
	var getData = function(){
		$http.get("http://thetechmap.com/api/message/getSocialUpdates")
			.success(function (data) {
				var messageIdLikedList = JSON.parse(localStorage.getItem("messageIdLiked"));
				for(i = 0; i < data.length; i++){
					if(data[i] != "" && data[i] != null){
						if(data[i].DatePosted != "" || data[i].DatePosted != null && data[i].DatePosted != undefined){
							var arrayDate = data[i].DatePosted.slice(0,10).split("-");
							data[i].DatePosted = arrayDate[1] + "-" + arrayDate[2] + "-" + arrayDate[0];
						}
						if(data[i].Replies != null && data[i].Replies.length > 0){
							data[i].Level = data[i].Replies.length;
						}
						if(messageIdLikedList != null && messageIdLikedList.length > 0){
							for(j = 0; j < messageIdLikedList.length; j++){
								if(messageIdLikedList[j] == data[i].Id){
									data[i].Likes = data[i].Likes + 1;
									var btnLikeId = "btnLike-" + data[i].Id;
									var elem = document.getElementById(btnLikeId);
									elem.innerHTML = "LIKED";
									elem.style.color = "orange";
									elem.style.paddingLeft = "5px";
								}
							}
						}
					}
				}
				$scope.messages = data;
				localStorage.setItem("socialMessages", JSON.stringify($scope.messages));
				console.log("Data -> " + $scope.messages);
				console.log("get social messages from server successful."); 
			}).error(function (error) {
				console.log('Error: ' + "Can't get social messages from server." + error); 
			});
	};
	
	//go to map screen
	$scope.GoToMap = function () {
		$location.path("/map");
	};
	
	// go to messges screen
	$scope.GoToMessages = function () {
		$location.path("/messages");
	};
	
	// go to user profile screen when user click a user photo
	$scope.GoToUserProfile = function(userID){
		$rootScope.isGoToUserProfile = true;
		localStorage.setItem('userID', userID);
		$location.path("/userprofile");
	};
	
	// handle LIKE button
	$scope.LikeMessage = function (messageId) {
		if($scope.isLike == false){
			var btnLikeId = "btnLike-" + messageId;
			var elem = document.getElementById(btnLikeId);
			elem.innerHTML = "LIKED";
			elem.style.color = "orange";
			elem.style.paddingLeft = "5px";
			// calculate likes number
			var numberLikeId = "numberLikeMessage-" + messageId;
			var numberLikeMessage = document.getElementById(numberLikeId);
			var value = numberLikeMessage.innerHTML.split(" ")[0];
			var numLike = parseInt(value) + 1;
			numberLikeMessage.innerHTML = numLike.toString() + " likes ";
			$scope.isLike = true;
			$scope.messageIdLiked.push(messageId);
			localStorage.setItem("messageIdLiked", JSON.stringify($scope.messageIdLiked));
			
	    }
		else{
			var btnLikeId = "btnLike-" + messageId;
			var elem = document.getElementById(btnLikeId);
			elem.innerHTML = "LIKE";
			elem.style.color = "gray";
			elem.style.paddingLeft = "10px";
			// re-calculate likes number
			var numberLikeId = "numberLikeMessage-" + messageId;
			var numberLikeMessage = document.getElementById(numberLikeId);
			var value = numberLikeMessage.innerHTML.split(" ")[0];
			var numLike = parseInt(value) - 1;
			numberLikeMessage.innerHTML = numLike.toString() + " likes ";
			$scope.isLike = false;
			if($scope.messageIdLiked.length > 0){
				for(var i = $scope.messageIdLiked.length - 1; i >= 0; i--) {
					if($scope.messageIdLiked[i] === messageId) {
					   $scope.messageIdLiked.splice(i, 1);
					}
				}
			}
			localStorage.setItem("messageIdLiked", JSON.stringify($scope.messageIdLiked));
		}
	};
	
	// handle COMMENT button
	$scope.GoToComment = function(message){
		$rootScope.contentMessage = message; 
		$location.path("/comment");
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
}