
export const assert = (function () {
  return function (boolVal: boolean, msg: string) {
    const assert = document.getElementById("assert");
    let ele = null;
    ele = document.createElement('li');
    ele.innerHTML = msg;
    boolVal ? ele.className = 'true' : ele.className = 'false';
    assert ? assert.appendChild(ele) : null;
  };
})();
export const header = (function() {
  return function(msg: string) {
    const assert = document.getElementById("assert");
    let ele = null;
    ele = document.createElement('h2');
    ele.innerHTML = msg;
    ele.className = 'header';
    assert ? assert.appendChild(ele) : null; 
  };
})();