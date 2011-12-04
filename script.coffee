jQuery ->
  chrome.extension.onRequest.addListener (request, sender, sendResponse) ->
    if request.type == 1 || request.type == 2
      sendResponse
        acknowledged: "Mission accepted."
        inject request.type, request.attack
    else
      sendResponse
        acknowledged: "Mission denied."


  inject = (type, attack) ->
    $('input').each ->
      if type == 2
        attack = "<script>alert('" + $(this).attr('name') + " is vulnerable to XSS.');</script>"

      $(this).val(attack)
      console.log $(this).val()
