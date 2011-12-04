
  jQuery(function() {
    var attacks, send_attack;
    attacks = ["", "sql attack", "xss attack"];
    chrome.contextMenus.create({
      "title": "SQL Injection",
      "onclick": function(data) {
        console.log(data.menuItemId);
        return send_attack(data.menuItemId);
      }
    });
    chrome.contextMenus.create({
      "title": "XSS Injection",
      "onclick": function(data) {
        console.log(data.menuItemId);
        return send_attack(data.menuItemId);
      }
    });
    return send_attack = function(type) {
      console.log("Sending attack: " + attacks[type]);
      return chrome.tabs.getSelected(null, function(tab) {
        return chrome.tabs.sendRequest(tab.id, {
          type: type,
          attack: attacks[type]
        }, function(response) {
          return console.log(response.acknowledged);
        });
      });
    };
  });
