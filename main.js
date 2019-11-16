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
let last;

let isTouchDevice = "ontouchstart" in document.documentElement;

if (isTouchDevice) {
  canvas.ontouchstart = e => {
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;
    last = [x, y];
  };
  canvas.ontouchmove = e => {
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;
    drawLine(last[0], last[1], x, y);
    last = [x, y];
  };
} else {
  canvas.onmousedown = e => {
    painting = true;
    last = [e.clientX, e.clientY];
  };
  canvas.onmousemove = e => {
    if (painting === true) {
      drawLine(last[0], last[1], e.clientX, e.clientY);
      last = [e.clientX, e.clientY];
    }
  };
  canvas.onmouseup = e => {
    painting = false;
  };
}

document.querySelector(".lw-small").onclick = function() {
  lw = 5;
};
document.querySelector(".lw-normal").onclick = function() {
  lw = 10;
};
document.querySelector(".lw-large").onclick = function() {
  lw = 20;
};

document.querySelector(".lc-black").onclick = function() {
  lc = "black";
  remove();
  document
    .querySelector(".lc-black")
    .querySelector(".circle")
    .classList.add("active");
};
document.querySelector(".lc-red").onclick = function() {
  lc = "red";
  remove();
  document
    .querySelector(".lc-red")
    .querySelector(".circle")
    .classList.add("active");
};
document.querySelector(".lc-green").onclick = function() {
  lc = "green";
  remove();
  document
    .querySelector(".lc-green")
    .querySelector(".circle")
    .classList.add("active");
};
document.querySelector(".clear").onclick = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const remove = function() {
  document
    .querySelector(".lc-green")
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
