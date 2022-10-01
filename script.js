//npx browser-sync start -s ./ -w *
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const getWidth = () => window.innerWidth;
const getHeight = () => window.innerHeight;

const setCanvasDimensions = () => {
   canvas.width = getWidth();
   canvas.height = getHeight();
};

const setMousePosition = (event) => {
   const x = event.clientX;
   const y = event.clientY;

  mouseX = x - getWidth()/2;
  mouseY = getHeight()/2 - y;
};

window.addEventListener('resize', () => {
   setCanvasDimensions();
   grid();
   player();
   food();
});

window.addEventListener('mousemove', setMousePosition);

const curveSpeed = (mousePositionX, mousePositionY, maxSpeed) => {

   return 
};

const straightSpeed = (mousePosition, maxSpeed) => {
   if(mousePosition^2 < maxSpeed*10) return mousePosition^2 / 10;
   else return maxSpeed;
};

const getSpeed = () => {
   const speed0 = 0;
   const maxSpeed = 10;

   if(Math.abs(mouseX) < 1 && Math.abs(mouseY) < 1) return speed0;
   else if(Math.abs(mouseY) < 1) return straightSpeed(mouseX, maxSpeed);
   else if(Math.abs(mouseX) < 1) return straightSpeed(mouseY, maxSpeed);
   else return curveSpeed(mouseX, mouseY, maxSpeed);
};

const drawGridVertical = (gridSize) => {
   for(let i = 0 ; i < getWidth()/gridSize ; i++) {
      ctx.fillRect(i*gridSize, 0, 1, getHeight())
   };
};

const drawGridHorizontal = (gridSize) => {
   for(let i = 0 ; i < getHeight()/gridSize ; i++) {
      ctx.fillRect(0, i*gridSize, getWidth(), 1)
   };
};


const grid = () => {
   const gridSize = 50;
   ctx.fillStyle = 'lightgrey';
   drawGridVertical(gridSize);
   drawGridHorizontal(gridSize);
};

const player = () => {
   ctx.fillStyle = 'lightblue';
   ctx.arc(getWidth()/2, getHeight()/2, playerRadius, 0, 360);
   ctx.fill();
};

const isEatable = () => {

};

const isCurrent = () => {

};

const drawFood = () => {

};

const food = () => {
   drawFood();
};

const Starterfood = () => {
   drawFood();
};

const game = () => {
   grid();
   player();
   food();
};

let playerRadius = 20;

let mouseX = 0;
let mouseY = 0;

setCanvasDimensions();
grid();
player();
Starterfood();

setInterval(game, 1000/60)