//npx browser-sync start -s ./ -w *
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const getWidth = () => window.innerWidth - 4;
const getHeight = () => window.innerHeight - 4;

const setCanvasDimensions = () => {
   canvas.width = getWidth();
   canvas.height = getHeight();
};

const mousePosition = (event) => {
   const x = event.clientX;
   const y = event.clientY;

  mousePositionX = x - getWidth();
  mousePositionY = y - getHeight();
};

window.addEventListener('resize', () => {
   setCanvasDimensions();
   grid();
   player();
   food();
});

window.addEventListener('mousemove', mousePosition);

const speed = () => {
   const speed0 = 0;

   if(mousePositionX < 1 && mousePositionY < 1) return speed0;
   else if(mousePositionY < 1) {

   }
   else if(mousePositionY < 1) {

   }
   else {

   }
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

let mousePositionX = 0;
let mousePositionY = 0;

setCanvasDimensions();
grid();
player();
Starterfood();

setInterval(game, 1000/60)