
  jQuery(function() {
    var send_attack, sql_menu, xss_menu;
    sql_menu = chrome.contextMenus.create({
      "title": "SQL Injection"
    });
    xss_menu = chrome.contextMenus.create({
      "title": "XSS Injection"
    });
    chrome.contextMenus.create({
      "title": "Basic SQL Injection",
      "parentId": sql_menu,
      "onclick": function(data) {
        console.log(data.menuItemId);
        return send_attack(data.parentMenuItemId, data.menuItemId);
      }
    });
    chrome.contextMenus.create({
      "title": "Basic XSS Injection",
      "parentId": xss_menu,
      "onclick": function(data) {
        console.log(data.menuItemId);
        return send_attack(data.parentMenuItemId, data.menuItemId);
      }
    });
    return send_attack = function(type, attack) {
      console.log("Sending attack. ");
      return chrome.tabs.getSelected(null, function(tab) {
        return chrome.tabs.sendRequest(tab.id, {
          type: type,
          attack: attack
        }, function(response) {
          return console.log(response.acknowledged);
        });
      });
    };
  });
