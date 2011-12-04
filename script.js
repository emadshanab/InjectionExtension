
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
      return $('input').each(function() {
        if (type === 2) {
          attack = "<script>alert('" + $(this).attr('name') + " is vulnerable to XSS.');</script>";
        }
        $(this).val(attack);
        return console.log($(this).val());
      });
    };
  });
