$(document).ready(function() {
  chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    console.log(sender.tag ? "from a content script:" + sender.tab.url : "from the extension");
    if (request.attack == "xss") {
      sendResponse({acknowledged: "Mission accepted."});
      xss_injection();
    } else {
      sendResponse({acknowledged: "Mission denied."});
    }
  });

  function xss_injection() {
    $('input').each(function() {
      console.log($(this).attr('name'));
    });
  }

  function sql_injection() {
    alert('sql hello');
  }
});
