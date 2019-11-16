let canvas = document.getElementById("canvas");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

let lw = 10;
let lc = "black";

let ctx = canvas.getContext("2d");
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

let painting = false;
let clearing = false;
let last;

let isTouchDevice = "ontouchstart" in document.documentElement;

if (isTouchDevice) {
  canvas.ontouchstart = e => {
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;
    if (clearing === true) {
      console.log(clearing);
      ctx.clearRect(x, y, lw, lw);
    } else {
      last = [x, y];
    }
  };
  canvas.ontouchmove = e => {
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;
    if (clearing === true) {
      ctx.clearRect(x, y, lw, lw);
    } else {
      drawLine(last[0], last[1], x, y);
      last = [x, y];
    }
  };
} else {
  canvas.onmousedown = e => {
    painting = true;
    if (clearing === true) {
      ctx.clearRect(e.clientX, e.clientY, lw, lw);
    } else {
      last = [e.clientX, e.clientY];
    }
  };
  canvas.onmousemove = e => {
    if (painting) {
      if (clearing) {
        ctx.clearRect(e.clientX, e.clientY, lw, lw);
      } else {
        drawLine(last[0], last[1], e.clientX, e.clientY);
        last = [e.clientX, e.clientY];
      }
    }
  };
  canvas.onmouseup = e => {
    painting = false;
  };
}

document.querySelector(".lw-small").onclick = function() {
  lw = 5;
  removeLW();
  document.querySelector(".lw-border.small").classList.add("active");
};
document.querySelector(".lw-normal").onclick = function() {
  lw = 10;
  removeLW();
  document.querySelector(".lw-border.normal").classList.add("active");
};
document.querySelector(".lw-large").onclick = function() {
  lw = 20;
  removeLW();
  document.querySelector(".lw-border.large").classList.add("active");
};

document.querySelector(".lc-black").onclick = function() {
  lc = "black";
  removeColor();
  document
    .querySelector(".lc-black")
    .querySelector(".circle")
    .classList.add("active");
};
document.querySelector(".lc-red").onclick = function() {
  lc = "red";
  removeColor();
  document
    .querySelector(".lc-red")
    .querySelector(".circle")
    .classList.add("active");
};
document.querySelector(".lc-yellow").onclick = function() {
  lc = "yellow";
  removeColor();
  document
    .querySelector(".lc-yellow")
    .querySelector(".circle")
    .classList.add("active");
};
document.querySelector(".lc-blue").onclick = function() {
  lc = "blue";
  removeColor();
  document
    .querySelector(".lc-blue")
    .querySelector(".circle")
    .classList.add("active");
};
document.querySelector(".lc-green").onclick = function() {
  lc = "green";
  removeColor();
  document
    .querySelector(".lc-green")
    .querySelector(".circle")
    .classList.add("active");
};

document.querySelector(".pen").onclick = function() {
  clearing = false;
};
document.querySelector(".eraser").onclick = function() {
  clearing = true;
};
document.querySelector(".clear").onclick = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const removeColor = function() {
  document
    .querySelector(".lc-green")
    .querySelector(".circle")
    .classList.remove("active");
  document
    .querySelector(".lc-blue")
    .querySelector(".circle")
    .classList.remove("active");
  document
    .querySelector(".lc-yellow")
    .querySelector(".circle")
    .classList.remove("active");
  document
    .querySelector(".lc-red")
    .querySelector(".circle")
    .classList.remove("active");
  document
    .querySelector(".lc-black")
    .querySelector(".circle")
    .classList.remove("active");
};
const removeLW = function() {
  document.querySelector(".lw-border.small").classList.remove("active");
  document.querySelector(".lw-border.normal").classList.remove("active");
  document.querySelector(".lw-border.large").classList.remove("active");
};
