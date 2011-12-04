
  jQuery(function() {
    var inject;
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
    return inject = function(type, attack) {
      var input, inputs, _i, _len, _results;
      inputs = document.getElementsByTagName('input');
      _results = [];
      for (_i = 0, _len = inputs.length; _i < _len; _i++) {
        input = inputs[_i];
        if (type === 2) {
          attack = "<script>alert('" + input.name + " is vulnerable to XSS.');</script>";
        }
        input.value = attack;
        _results.push(console.log(input.value));
      }
      return _results;
    };
  });
