jQuery ->
  attacks = ["", "sql attack", "xss attack"]

  chrome.contextMenus.create
    "title": "SQL Injection"
    "onclick": (data) ->
      console.log data.menuItemId
      send_attack data.menuItemId

  chrome.contextMenus.create
    "title": "XSS Injection"
    "onclick": (data) ->
      console.log data.menuItemId
      send_attack data.menuItemId

  send_attack = (type) ->
    console.log "Sending attack: " + attacks[type]
    chrome.tabs.getSelected null, (tab) ->
      chrome.tabs.sendRequest tab.id, 
        type: type
        attack: attacks[type],
        (response) ->
          console.log response.acknowledged

