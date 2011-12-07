jQuery ->
  create_sub_menu = (parent, id, name) ->
    chrome.contextMenus.create
      "title": name
      "parentId": parent 
      "onclick": (data) ->
        send_attack parent, id 

  sql_menu = chrome.contextMenus.create
    "title": "SQL Injection"

  xss_menu = chrome.contextMenus.create
    "title": "XSS Injection"

  attacks = []
  attacks['sql'] = [
    {id: 0, name: "Basic SQL", parent: sql_menu},
    {id: 1, name: "Intermediate SQL", parent: sql_menu}
  ]
  attacks['xss'] = [
    {id: 0, name: "Basic XSS", parent: xss_menu},
    {id: 1, name: "Intermediate XSS", parent: xss_menu}
  ]

  for type in [attacks.sql, attacks.xss]
    for attack in type
      create_sub_menu(attack.parent, attack.id, attack.name)

  send_attack = (type, attack) ->
    console.log "Sending attack." + type + ", " + attack
    chrome.tabs.getSelected null, (tab) ->
      chrome.tabs.sendRequest tab.id, 
        type: type
        attack: attack
        (response) ->
          console.log response.acknowledged
