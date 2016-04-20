/* ==========   HomeCompaniesViewController   ==========
 ============================================= */

function HomeCompaniesViewController($scope, $rootScope, $http, $location, $window) {

  // var mapOptions = {
  // zoom: 4,
  // center: new google.maps.LatLng(40.0000, -98.0000),
  // mapTypeId: google.maps.MapTypeId.TERRAIN
  // }

  // $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // $scope.markers = [];

  // var infoWindow = new google.maps.InfoWindow();

  // var createMarker = function (info){

  // var marker = new google.maps.Marker({
  // map: $scope.map,
  // position: new google.maps.LatLng(info.lat, info.long),
  // title: info.city
  // });
  // marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

  // google.maps.event.addListener(marker, 'click', function(){
  // infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
  // infoWindow.open($scope.map, marker);
  // });

  // $scope.markers.push(marker);

  // }

  // for (i = 0; i < cities.length; i++){
  // createMarker(cities[i]);
  // }

  // $scope.openInfoWindow = function(e, selectedMarker){
  // e.preventDefault();
  // google.maps.event.trigger(selectedMarker, 'click');
  // }
  $scope.GoToMap = function () {
    $location.path("/map");
  };
  $scope.GoToMessages = function () {
    $location.path("/home");
  };
  $scope.GoToMembers = function () {
    $location.path("/members");
  };GoToCompanyDetail
   $scope.GoToCompanyDetail = function () {
		showCustomDialog(function(){
			}, "Function is coming...!");
  };
  // $scope.onTabChange = function (event) {
    // // find tab is active and deactive this tab
    // var tabEl = event && event.target;
    // if (!tabEl) return;

    // var tabContent = $("#tab-content");
    // var tabActive = tabContent && tabContent.find("div.tab-pane.active");
    // tabActive && tabActive.removeClass("active");
    // // set active on selected tab
    // var tabEl = event.target;
    // var selectedTabContentId;
    // if (tabEl.getAttribute("data-content")) {
      // selectedTabContentId = tabEl && tabEl.getAttribute("data-content");
    // } else {
      // var parentEl = $(tabEl).parent();
      // selectedTabContentId = parentEl && parentEl[0] && parentEl[0].getAttribute("data-content");
    // }
    // var selectedTabContent = $("#" + selectedTabContentId);
    // selectedTabContent && selectedTabContent.addClass("active");
  // };
}

//Data
// var cities = [
// {
// city : 'Toronto',
// desc : 'This is the best city in the world!',
// lat : 43.7000,
// long : -79.4000
// },
// {
// city : 'New York',
// desc : 'This city is aiiiiite!',
// lat : 40.6700,
// long : -73.9400
// },
// {
// city : 'Chicago',
// desc : 'This is the second best city in the world!',
// lat : 41.8819,
// long : -87.6278
// },
// {
// city : 'Los Angeles',
// desc : 'This city is live!',
// lat : 34.0500,
// long : -118.2500
// },
// {
// city : 'Las Vegas',
// desc : 'Sin City...\'nuff said!',
// lat : 36.0800,
// long : -115.1522
// }
// ];