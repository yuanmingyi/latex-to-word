console.log('loadContent.js loaded');
var url = localStorage['latex2mml.ext'];
if (url === location.href) {
	//var convertPath = 'https://c328740.ssl.cf1.rackcdn.com/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML';
	//var convertPath = "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML";
	var convertPath = chrome.extension.getURL('latexMathML.js');
	var convertNode = document.createElement('script');
	convertNode.src = convertPath;
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(convertNode);

	var interactNode = document.createElement('script');
	interactNode.src = chrome.extension.getURL('interact.js');
	head.appendChild(interactNode);

	var cssNode = document.createElement('style');
	cssNode.innerHTML = "body{word-wrap:break-word;white-space:pre-wrap;}";
	head.appendChild(cssNode);

	localStorage['latex2mml.ext'] = null;
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.id === 'latex2mml.ext') {
		localStorage['latex2mml.ext'] = location.href;
		sendResponse({});	
		location.reload(false);
	}
});

/*
(function() {
window.addEventListener('onload', function(e) {
	var tarUrl = window.location.search.slice(1);
	var xhr = new XMLHttpRequest();
	xhr.open("GET", tarUrl, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var content = xhr.responseText;
			document.getElementById('text').innerHTML = content;
		}
	};
	xhr.send();
}, true);
})();
*/