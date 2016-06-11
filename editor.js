(function(exports) {
  
  'use strict';

  var canvas = new Object();
  var sb = new Object();
  var cursor = new Object();
  
  var lines = [];
  var cw = 7;
  var ch = 0;
  var head = [0,0];
  var tail = [0,0];

  var init = exports.init = function(obj) {
    canvas = document.createElement('pre');
    canvas.style.border = "1px solid black"
    canvas.style.margin = "0px"
    obj.appendChild(canvas);
    canvas.innerText = "newcode";
    ch = canvas.offsetHeight-1;
    sb = document.createElement('div');
    sb.className = 'statusbar';
    obj.appendChild(sb);
    cursor = document.createElement('div');
    cursor.className = 'cursor';
    obj.appendChild(cursor);
  }
  var setValue = exports.setValue = function(str) {
    lines = str.split("\n");
    paint();
  }
  var getCursor = exports.getCursor = function() {
    return head;
  }
  var setCursor = exports.setCursor = function(line,char) {
    line = (line>0)?line:0;
    char = (char>0)?char:0;
    head = [line,char];
    sb.innerText = "Line "+ line +", Column "+ char;
    cursor.style.top = canvas.style.top + line*ch + "px";
    cursor.style.left = canvas.style.left + (char*cw+1)+"px";
  }
  var replaceRange = exports.replaceRange = function(str, cur) {
    var newLines = str.split("\n");
    newLines.forEach(function(item){
      lines[head[0]]=item;
    });
    canvas.innerHTML += str;
    var line = 0;
    var char = parseInt(str.length);
    var pos = str.indexOf('\n');
    while (pos !== -1) {
      line++;
      char -= (pos + 1);
      pos = str.indexOf('\n', pos + 1);
    }
    head[0] += line;
    (char==0) ? head[1] = 0 : head[1] += char;
    setCursor(head[0],head[1]);
  }
  var execCommand = exports.execCommand = function(cmd) {
    switch (cmd) {
    case "delCharBefore":
      break;
    default:
      break;
    }
  }
  var focus = exports.focus = function() {
    //canvas.focus();
  }
  function paint(){
    canvas.innerHTML = "";
    
    for (var l = 0;l<lines.length;l++) {
      var item = lines[l];
      var i = item.indexOf("/*");
      console.log(item);
      if (i<0) {
        canvas.appendChild(document.createTextNode(item));
        canvas.appendChild(document.createElement("br"));
      } else {
        while (l<lines.length) {
          var i = item.indexOf("/*");
          var j = item.indexOf("*/");
          if (j<0) {
            if (i>0) {
              var comment = item.split("/*");
              console.log(comment);
              canvas.appendChild(document.createTextNode(comment[0]));
              var span = canvas.appendChild(document.createElement("span"));
              span.className = "multiline-comment";
              span.appendChild(document.createTextNode("/*"+comment[1]));
              canvas.appendChild(span);
              canvas.appendChild(document.createElement("br"));
              i = 0;
            } else {
              var span = canvas.appendChild(document.createElement("span"));
              span.className = "multiline-comment";
              span.appendChild(document.createTextNode(item));
              canvas.appendChild(span);
              canvas.appendChild(document.createElement("br"));
            }
          } else {
            if (i>0) {
              var comment = item.split("/*");
              console.log(comment);
              canvas.appendChild(document.createTextNode(comment[0]));
              var span = canvas.appendChild(document.createElement("span"));
              span.className = "multiline-comment";
              span.appendChild(document.createTextNode("/*"+comment[1]));
              canvas.appendChild(span);
              canvas.appendChild(document.createElement("br"));
              i = 0;
            } else {
              var comment = item.split("*/");
              var span = canvas.appendChild(document.createElement("span"));
              span.className = "multiline-comment";
              span.appendChild(document.createTextNode(comment[0]+"*/"));
              canvas.appendChild(span);
              canvas.appendChild(document.createTextNode(comment[1]));
              canvas.appendChild(document.createElement("br"));
            }
            break;
          }
          l++;
          var item = lines[l];
        }
      }
    }
  }

})(typeof exports === 'undefined'? this['editor']={}: exports);
