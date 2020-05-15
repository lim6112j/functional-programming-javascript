'use strict'
const log = (msg, v) => console.log(msg, " => ", v);
function assert(value, desc) {
  const li = document.createElement("li");
  li.className = value ? "pass" : "fail";
  li.appendChild(document.createTextNode(desc));
  document.getElementById("results").appendChild(li);
}
function Button() {
  this.clicked = false;
  this.click = function() {
    this.clicked = true;
    assert(button.clicked, "button clicked");
    assert(button instanceof Button, "button is instance of Button constructor");
    assert(this instanceof Button, "this is instance of Button constructor")
    log("this", this)
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(button.clicked))
    document.getElementById("results").appendChild(li);}
}
const button = new Button();
const elem = document.getElementById("test");
elem.addEventListener('click', button.click);

