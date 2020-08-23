var page = require('webpage').create();
// page.onConsoleMessage = function(msg) {
//     console.log('Page title is ' + msg); 
// };
page.open('http://localhost:8080/', function(status) {
  console.log("Status: " + status);
  if(status === "success") {
    var body = page.evaluate(function() {
        var toString = function(pad, el) {
            var children = el.children;
            var childrenStr = ''
            for (var i = 0; i < children.length; i++) {
                childrenStr += toString('    ' + pad, children[i])  + '\n';
                var name;
                if (el.nodeType === Node.TEXT_NODE) {
                    name = '#text' + JSON.stringify(el.textContent);
                }
                if (el.nodeType === Node.ELEMENT_NODE) {
                    name = el.tagName;
                }
            }
            return pad + name + (childrenStr ? '\n' + childrenStr : '');
            // return pad + el.tagName + (childrenStr ? '\n' + childrenStr : '');
        }
        return toString('', document.body);
    })
    console.log(body);
  }
  phantom.exit();
});