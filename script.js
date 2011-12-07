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
    var attack = attacks[type][attack];
    var inputs  = document.getElementsByTagName('input');
    var textareas = document.getElementsByTagName('textarea');

    for (i in inputs) {
      var input = inputs[i];
      var injection;
      
      if (input.type === 'password') {
        injection = attack('password_field');
      } else {
        injection = attack(input.name);
      }

      if (input.type === 'email') { 
        input.type = 'text';
      }

      if (input.type === 'checkbox') {
        input.checked = 'checked';
      }

      if (input.type === 'radio') {
        input.checked = 'checked';
      }

      input.value = injection;
      console.log(input.value);
    }

    for (t in textareas) {
      var textarea = textareas[t];
      injection = attack(textarea.name);
      textarea.value = injection;
      console.log(textarea.value);
    }
  }

  /* Basic XSS */
  attacks[2][0] = function(name) {
    return "<script>alert('"+name+" is vulnerable to XSS.');</script>";
  }

  /* Style XSS Attack */
  attacks[2][1] = function(nume) {
    return "@import\"javascript:alert('XSS')\";"
  }
  
  /* Attribute attack */
  attacks[2][2] = function(name) {
    return "\"><script>alert('"+name+" is vulnerable to an attribute attack.');</script>";
  }
});
