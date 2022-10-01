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
   console.log(event);

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

const getSpeed = () => {
   const speed0 = 0;
   const minSpeed = 20;
   const maxSpeed = 200;
   const speed = Math.sqrt(mouseX*mouseX + mouseY*mouseY);

   if(speed < minSpeed) return speed0;
   else if(speed < maxSpeed) return speed/20;
   else return maxSpeed/20;
};

const howMuch = (mouse) => {
   const sum = mouseX + mouseY;
   return mouse/sum;
};

const drawGridVertical = (gridSize,) => {
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
   ctx.fillStyle = 'white';
   ctx.fillRect(0, 0, getWidth(), getHeight());

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
   //console.log(getSpeed());
};

let playerRadius = 20;

let mouseX = 0;
let mouseY = 0;

setCanvasDimensions();
grid();
player();
Starterfood();

setInterval(game, 1000/60)