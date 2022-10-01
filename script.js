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

const getSpeed = () => {
   const speed0 = 0;
   const minSpeed = 20;
   const maxSpeed = 200;
   const speed = Math.sqrt(mouseX*mouseX + mouseY*mouseY);

   if(speed < minSpeed) return speed0;
   else if(speed < maxSpeed) return speed/20;
   else return maxSpeed/20;
};

const shareOfSpeed = (mouse) => {
   if(mouseX == 0 && mouseY == 0) return 0;
   const share = Math.abs(mouse)/(Math.abs(mouseX) + Math.abs(mouseY));
   return share;
};

const drawGridHorizontal = (gridSize) => {
   const speed = shareOfSpeed(mouseX) * getSpeed();
   if(mouseX > 0) moveX -= speed;
   else moveX += speed;

   for(let i = 0 ; i < getWidth()/gridSize ; i++) {
      const x = i*gridSize + moveX

      if(moveX < gridSize) {
         ctx.fillRect(x, 0, 1, getHeight())
      }
      else {
         moveX -= gridSize;
         ctx.fillRect(x - gridSize, 0, 1, getHeight())
      };
   };
};

const drawGridVertical = (gridSize) => { 
   const speed = shareOfSpeed(mouseY) * getSpeed();
   if(mouseY > 0 ) moveY += speed;
   else moveY -= speed;

   for(let i = 0 ; i < getHeight()/gridSize ; i++) {
      const y = i*gridSize + moveY

      if(moveY < gridSize) {
         ctx.fillRect(0, y, getWidth(), 1);
      }
      else {
         moveY -= gridSize;
         ctx.fillRect(0, y - gridSize, getWidth(), 1)
      };
   };
};

const grid = () => {
   ctx.fillStyle = 'white';
   ctx.fillRect(0, 0, getWidth(), getHeight());

   const gridSize = 70;
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
let moveX = 30;

let mouseY = 0;
let moveY = 50;

setCanvasDimensions();
grid();
player();
Starterfood();

setInterval(game, 1000/60)