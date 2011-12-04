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
      attack = xss(input.name) if type == 2
      attack = xss('password_field') if type == 2 && input.type == 'password' 
      
      input.type = 'text' if input.type == 'email'

      input.value = attack
      console.log input.value

  xss= (name) ->
    "<script>alert('" + name + " is vulnerable to XSS.');</script>"
