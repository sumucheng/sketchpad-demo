// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var canvas = document.getElementById("canvas");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
var lw = 10;
var lc = "black";
var ctx = canvas.getContext("2d");
ctx.strokeStyle = "none";

function drawLine(x1, y1, x2, y2) {
  ctx.fillStyle = lc;
  ctx.strokeStyle = lc;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineWidth = lw;
  ctx.lineCap = "round";
  ctx.stroke();
}

var painting = false;
var clearing = false;
var last;
var isTouchDevice = "ontouchstart" in document.documentElement;

if (isTouchDevice) {
  canvas.ontouchstart = function (e) {
    var x = e.touches[0].clientX;
    var y = e.touches[0].clientY;

    if (clearing === true) {
      console.log(clearing);
      ctx.clearRect(x, y, lw, lw);
    } else {
      last = [x, y];
    }
  };

  canvas.ontouchmove = function (e) {
    var x = e.touches[0].clientX;
    var y = e.touches[0].clientY;

    if (clearing === true) {
      ctx.clearRect(x, y, lw, lw);
    } else {
      drawLine(last[0], last[1], x, y);
      last = [x, y];
    }
  };
} else {
  canvas.onmousedown = function (e) {
    painting = true;

    if (clearing === true) {
      ctx.clearRect(e.clientX, e.clientY, lw, lw);
    } else {
      last = [e.clientX, e.clientY];
    }
  };

  canvas.onmousemove = function (e) {
    if (painting) {
      if (clearing) {
        ctx.clearRect(e.clientX, e.clientY, lw, lw);
      } else {
        drawLine(last[0], last[1], e.clientX, e.clientY);
        last = [e.clientX, e.clientY];
      }
    }
  };

  canvas.onmouseup = function (e) {
    painting = false;
  };
}

document.querySelector(".lw-small").onclick = function () {
  lw = 5;
  removeLW();
  document.querySelector(".lw-border.small").classList.add("active");
};

document.querySelector(".lw-normal").onclick = function () {
  lw = 10;
  removeLW();
  document.querySelector(".lw-border.normal").classList.add("active");
};

document.querySelector(".lw-large").onclick = function () {
  lw = 20;
  removeLW();
  document.querySelector(".lw-border.large").classList.add("active");
};

document.querySelector(".lc-black").onclick = function () {
  lc = "black";
  removeColor();
  document.querySelector(".lc-black").querySelector(".circle").classList.add("active");
};

document.querySelector(".lc-red").onclick = function () {
  lc = "red";
  removeColor();
  document.querySelector(".lc-red").querySelector(".circle").classList.add("active");
};

document.querySelector(".lc-yellow").onclick = function () {
  lc = "yellow";
  removeColor();
  document.querySelector(".lc-yellow").querySelector(".circle").classList.add("active");
};

document.querySelector(".lc-blue").onclick = function () {
  lc = "blue";
  removeColor();
  document.querySelector(".lc-blue").querySelector(".circle").classList.add("active");
};

document.querySelector(".lc-green").onclick = function () {
  lc = "green";
  removeColor();
  document.querySelector(".lc-green").querySelector(".circle").classList.add("active");
};

document.querySelector(".pen").onclick = function () {
  clearing = false;
};

document.querySelector(".eraser").onclick = function () {
  clearing = true;
};

document.querySelector(".clear").onclick = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

var removeColor = function removeColor() {
  document.querySelector(".lc-green").querySelector(".circle").classList.remove("active");
  document.querySelector(".lc-blue").querySelector(".circle").classList.remove("active");
  document.querySelector(".lc-yellow").querySelector(".circle").classList.remove("active");
  document.querySelector(".lc-red").querySelector(".circle").classList.remove("active");
  document.querySelector(".lc-black").querySelector(".circle").classList.remove("active");
};

var removeLW = function removeLW() {
  document.querySelector(".lw-border.small").classList.remove("active");
  document.querySelector(".lw-border.normal").classList.remove("active");
  document.querySelector(".lw-border.large").classList.remove("active");
};
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.16f995ac.js.map