jQuery ->
  sql_menu = chrome.contextMenus.create
    "title": "SQL Injection"

  xss_menu = chrome.contextMenus.create
    "title": "XSS Injection"

  chrome.contextMenus.create
    "title": "Basic SQL Injection"
    "parentId": sql_menu 
    "onclick": (data) ->
      console.log data.menuItemId
      send_attack data.parentMenuItemId, data.menuItemId

  chrome.contextMenus.create
    "title": "Basic XSS Injection"
    "parentId": xss_menu
    "onclick": (data) ->
      console.log data.menuItemId
      send_attack data.parentMenuItemId, data.menuItemId

  send_attack = (type, attack) ->
    console.log "Sending attack. "
    chrome.tabs.getSelected null, (tab) ->
      chrome.tabs.sendRequest tab.id, 
        type: type
        attack: attack
        (response) ->
          console.log response.acknowledged

