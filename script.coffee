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
    inputs = document.getElementsByTagName 'input'
    for input in inputs
      attack = "<script>alert('" + input.name + " is vulnerable to XSS.');</script>" if type == 2
      
      # Reminder to self to go and change the email field types to text

      input.value = attack
      console.log input.value

