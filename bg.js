$(document).ready(function() {
  var attacks = [];
  attacks[1] = "sql attack";
  attacks[2] = "xss attack";

  chrome.contextMenus.create({"title": "SQL Injection", "onclick": function(data) { 
    console.log(data.menuItemId);
    send_attack(data.menuItemId);
  }});
  chrome.contextMenus.create({"title": "XSS Injection", "onclick": function(data) {
    console.log(data.menuItemId);
    send_attack(data.menuItemId);
  }});

  function send_attack(atk) {
    console.log("Sending attack: " + attacks[atk]);
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.sendRequest(tab.id, {type: atk, attack: attacks[atk]}, function(response) {
        console.log(response.acknowledged);
      });
    });
  }
});
