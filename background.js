chrome.browserAction.onClicked.addListener(function(tab) {
	console.log('extension clicked');
	chrome.tabs.sendRequest(tab.id, {'id':'latex2mml.ext'});
});