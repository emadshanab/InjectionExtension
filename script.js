$(document).ready(function() {
  chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    console.log(sender.tag ? "from a content script:" + sender.tab.url : "from the extension");
    if (request.type == 1 || request.type == 2) {
      sendResponse({acknowledged: "Mission accepted."});
      inject(request.type, request.attack);
    } else {
      sendResponse({acknowledged: "Mission denied."});
    }
  });

  function inject(type, attack) {
    $('input').each(function() {
      if (type == 2) {
        attack = "<script>alert('" + $(this).attr('name') + " is vulnerable to XSS attacks.');</script>";
      }

      $(this).val(attack);
      console.log($(this).val());
    });
  }
});
