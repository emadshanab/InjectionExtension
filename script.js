$(document).ready(function() {
  var attacks = [[],[],[]];

  chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
    if (request.type == 1 || request.type == 2) {
      sendResponse({acknowledged: "Mission accepted."});
      inject(request.type, request.attack);
    } else {
      sendResponse({acknowledged: "Mission denied."});
    }
  });

  function inject(type, attack) {
    attack = attacks[type][attack];
    attack();
  }

  /* Basic XSS */
  attacks[2][0] = function() {
    var inputs  = document.getElementsByTagName('input');
    for (i in inputs) {
      var input = inputs[i];
      var injection;
      
      if (input.type === 'password') {
        injection = "<script>alert('password_field is vulnerable to XSS.');</script>";
      } else {
        injection = "<script>alert('" + input.name + " is vulnerable to XSS.');</script>"
      }

      if (input.type === 'email') { 
        input.type = 'text';
      }

      input.value = injection;
      console.log(input.value);
    }
  }
});
