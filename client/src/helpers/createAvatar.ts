const height = 100;
const width = 100;

function getRandomColor() {
  function getRandomNum() {
    return Math.floor(Math.random() * (200 - 20) + 20);
  }
  return `rgb(${getRandomNum()}, ${getRandomNum()}, ${getRandomNum()})`;
}

const figures = [
  function drawRect(ctx: CanvasRenderingContext2D, color) {
    ctx.fillStyle = color;
    ctx.fillRect(25, 25, 50, 50);
  },

  function drawTriangle(ctx: CanvasRenderingContext2D, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(50, 25);
    ctx.lineTo(75, 75);
    ctx.lineTo(25, 75);
    ctx.fill();
  },

  function drawCircle(ctx: CanvasRenderingContext2D, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(50, 50, 30, 0, Math.PI * 2);
    ctx.fill();
  },

  function drawRhomb(ctx: CanvasRenderingContext2D, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(20, 50);
    ctx.lineTo(50, 80);
    ctx.lineTo(80, 50);
    ctx.lineTo(50, 20);
    ctx.fill();
  },
];

export function createAvatar(): string {
  const canvas = document.createElement("canvas");
  canvas.height = height;
  canvas.width = width;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, 100, 100);
    figures[Math.floor(Math.random() * figures.length)](ctx, getRandomColor());
  }

  const dataURL = canvas.toDataURL();
  return dataURL;
}
