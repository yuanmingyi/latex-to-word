(function() {	
	var popup = (function() {
		var win = null;
		var text = null;
		var mml = null;

		var create = function(x, y, contentElement) {
			if (!win) {
				win = document.createElement('div');
				win.style.cssText = "word-wrap:break-word;border:4px dashed red;color:black;background-color:white;margin:10px;padding:8px;position:fixed;z-index:200";
				text = document.createElement('div');
				text.style.cssText = "padding:3px;text-align:center";
				win.appendChild(text);
				mml = document.createElement('textarea');
				mml.style.cssText = "border-width:0px;padding:3px;width:100%";
				win.appendChild(mml);
				document.body.appendChild(win);
			}

			win.style.left = x + 'px';
			win.style.top = y + 'px';

			var parentNode = contentElement.parentNode;	
			var nextNode = contentElement.nextSibling;	
			text.innerHTML = '';
			text.appendChild(contentElement);
			var content = text.innerHTML;
			if (nextNode) {
				parentNode.insertBefore(contentElement, nextNode);
			} else {
				parentNode.appendChild(contentElement);
			}

			text.innerHTML = content;
			// convert to word format
			content = content.replace(/<math\s*[^>]*/im, '<math xmlns:mml="http://www.w3.org/1998/Math/MathML" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math"');
			//content = content.replace(/<\/?mstyle\s*[^>]*>/img, '');
			content = content.replace(/<\/?mspace\s*[^>]*>/img, '');
			content = content.replace(/<\/?/mg, '$&mml:');
			console.log(content);
			mml.value = content;
			mml.select();
			//mml.style.cssText = "display:none";
			document.execCommand('Copy',true,null);

			return win;
		};

		var remove = function() {
			if (win) {
				document.body.removeChild(win);
				win = null;
			}
		}

		return {
			'create': create,
			'remove': remove
		};
	})();

	document.addEventListener('click', function(e) {
		var target = e.target;
		while (target.nodeType !== 9 && target.nodeName.toLowerCase() !== 'math') {
			target = target.parentNode;
		}
		if (target.nodeType !== 9) {	// target is 'math' node
			popup.create(e.clientX, e.clientY, target);
			e.stopPropagation();
		} else {
			popup.remove();	
		}
	});

})();
