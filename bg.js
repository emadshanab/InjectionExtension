$(document).ready(function() {
  chrome.contextMenus.create({"title": "SQL Injection", "onclick": send_sql});
  chrome.contextMenus.create({"title": "XSS Injection", "onclick": send_xss});

  function send_sql() {
    send_attack('sql');
  }

  function send_xss() {
    send_attack('xss');
  }

  function send_attack(atk) {
    console.log("Sending attack: " + atk);
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.sendRequest(tab.id, {attack: atk}, function(response) {
        console.log(response.acknowledged);
      });
    });
  }
});
