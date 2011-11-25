$(document).ready(function() {
  var sql = chrome.contextMenus.create({"title": "SQL Injection", "onclick": sql_injection});
  var xss = chrome.contextMenus.create({"title": "XSS Injection", "onclick": xss_injection}); 

  function xss_injection() {
    alert('xss hello');
  }

  function sql_injection() {
    alert('sql hello');
  }
});


