
  jQuery(function() {
    var inject, xss;
    chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
      if (request.type === 1 || request.type === 2) {
        sendResponse({
          acknowledged: "Mission accepted."
        });
        return inject(request.type, request.attack);
      } else {
        return sendResponse({
          acknowledged: "Mission denied."
        });
      }
    });
    inject = function(type, attack) {
      var input, inputs, _i, _len, _results;
      inputs = document.getElementsByTagName('input');
      _results = [];
      for (_i = 0, _len = inputs.length; _i < _len; _i++) {
        input = inputs[_i];
        if (type === 2) attack = xss(input.name);
        if (input.type === 'email') input.type = 'text';
        input.value = attack;
        _results.push(console.log(input.value));
      }
      return _results;
    };
    return xss = function(name) {
      return "<script>alert('" + name + " is vulnerable to XSS.');</script>";
    };
  });
