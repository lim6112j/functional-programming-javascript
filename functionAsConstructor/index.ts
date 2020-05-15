'use strict'
function Button() {
  this.clicked = false;
  this.click = function() {
    console.log('clicked')
    this.clicked = true;
    console.log(this.clicked)
  }
}
var button = new Button();
var elem = document.getElementById("test");
elem.addEventListener('click', button.click);