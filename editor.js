(function(exports) {
  
  'use strict';

  var canvas = new Object();
  var sb = new Object();
  var cursor = new Object();
  var head = [0,0];
  var tail = [0,0];

  var init = exports.init = function(obj) {
    canvas = document.createElement('pre');
    canvas.style.border = "1px solid black"
    canvas.style.margin = "0px"
    obj.appendChild(canvas);
    sb = document.createElement('div');
    sb.className = 'statusbar';
    obj.appendChild(sb);
    cursor = document.createElement('div');
    cursor.className = 'cursor';
    obj.appendChild(cursor);
  }
  var setValue = exports.setValue = function(str) {
    canvas.innerText = str;
  }
  var getCursor = exports.getCursor = function() {
    return head;
  }
  var setCursor = exports.setCursor = function(line,char) {
    line = (line>0)?line:0;
    char = (char>0)?char:0;
    head = [line,char];
    sb.innerText = "Line "+ line +", Column "+ char;
    var cw = 6;
    var ch = 18;
    cursor.style.top = canvas.style.top + line*ch + "px";
    cursor.style.left = canvas.style.left + (char*cw+1)+"px";
  }
  var replaceRange = exports.replaceRange = function(str, cur) {
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
})(typeof exports === 'undefined'? this['editor']={}: exports);
