$(document).ready(function() {
  chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    console.log(sender.tag ? "from a content script:" + sender.tab.url : "from the extension");
    if (request.type == 1) {
      sendResponse({acknowledged: "Mission accepted."});
      sql_injection(request.attack);
    } else if (request.type == 2) {
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

  function sql_injection(sql) {
    console.log(sql);
  }
});
