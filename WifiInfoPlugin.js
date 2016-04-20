
(function(cordova) {
    var cordovaRef = window.PhoneGap || window.Cordova || window.cordova;

	function WifiInfo() {}

WifiInfo.prototype.get = function(success, fail) {
		cordovaRef.exec(success, success, 'WifiInfoPlugin', null, [] );
};

cordova.addConstructor(function() {

	if (!window.plugins) {
		window.plugins = {};
	}
	window.plugins.WifiInfo = new WifiInfo();
});

 })(window.cordova || window.Cordova || window.PhoneGap);
