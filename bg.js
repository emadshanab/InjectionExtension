$(document).ready(function() {
  function create_sub_menu(parent_id, id, name) {
    chrome.contextMenus.create({
      "title": name,
      "parentId": parent_id,
      "onclick": function(data) {
        send_attack(parent_id, id);
      }
    });
  }

  var sql_menu = chrome.contextMenus.create({
    "title": "SQL Injection"
  });

  var xss_menu = chrome.contextMenus.create({
    "title": "XSS Injection"
  });

  var attacks = [];
  attacks['sql'] = [
    {id: 0, name: "Basic SQL", parent_id: sql_menu},
    {id: 1, name: "DROP TABLE users", parent_id: sql_menu},
    {id: 2, name: "SELECT * FROM users", parent_id: sql_menu},
    {id: 3, name: "Insert injection", parent_id: sql_menu},
  ];
  attacks['xss'] = [
    {id: 0, name: "Basic XSS", parent_id: xss_menu},
    {id: 1, name: "Style Attack", parent_id: xss_menu},
    {id: 2, name: "Attribute Attack", parent_id: xss_menu},
    {id: 3, name: "Redirect cookie steal", parent_id: xss_menu},
    {id: 4, name: "src/href Attack", parent_id: xss_menu},
    {id: 5, name: "Ponies?", parent_id: xss_menu},
  ]

  for (type in attacks) {
    for (attack in attacks[type]) {
      var a = attacks[type][attack];
      create_sub_menu(a.parent_id, a.id, a.name);
    }
  }

  function send_attack(type, attack) {
    console.log("Sending attack. " + type + ", " + attack);
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.sendRequest(tab.id, {
        type: type,
        attack: attack
      });
    });
  }
});
