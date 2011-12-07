
  jQuery(function() {
    var attack, attacks, create_sub_menu, send_attack, sql_menu, type, xss_menu, _i, _j, _len, _len2, _ref;
    create_sub_menu = function(parent, id, name) {
      return chrome.contextMenus.create({
        "title": name,
        "parentId": parent,
        "onclick": function(data) {
          return send_attack(parent, id);
        }
      });
    };
    sql_menu = chrome.contextMenus.create({
      "title": "SQL Injection"
    });
    xss_menu = chrome.contextMenus.create({
      "title": "XSS Injection"
    });
    attacks = [];
    attacks['sql'] = [
      {
        id: 0,
        name: "Basic SQL",
        parent: sql_menu
      }, {
        id: 1,
        name: "Intermediate SQL",
        parent: sql_menu
      }
    ];
    attacks['xss'] = [
      {
        id: 0,
        name: "Basic XSS",
        parent: xss_menu
      }, {
        id: 1,
        name: "Intermediate XSS",
        parent: xss_menu
      }
    ];
    _ref = [attacks.sql, attacks.xss];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      type = _ref[_i];
      for (_j = 0, _len2 = type.length; _j < _len2; _j++) {
        attack = type[_j];
        create_sub_menu(attack.parent, attack.id, attack.name);
      }
    }
    return send_attack = function(type, attack) {
      console.log("Sending attack." + type + ", " + attack);
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
