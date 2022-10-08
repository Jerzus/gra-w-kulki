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
   game();
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
   const speed = Math.floor(shareOfSpeed(mouseX) * getSpeed());
   if(mouseX > 0) moveX -= speed;
   else moveX += speed;
   ctx.beginPath();
   for(let i = 0 ; i < getWidth()/gridSize ; i++) {
      const x = i*gridSize + moveX

      if(moveX < 0) {
         moveX += gridSize;
         ctx.fillRect(x + gridSize, 0, 1, getHeight())
      }
      else if(moveX < gridSize) {
         ctx.fillRect(x, 0, 1, getHeight())
      }
      else {
         moveX -= gridSize;
         ctx.fillRect(x - gridSize, 0, 1, getHeight())
      };
      ctx.closePath();
   };
};

const drawGridVertical = (gridSize) => { 
   const speed = Math.floor(shareOfSpeed(mouseY) * getSpeed());
   if(mouseY > 0 ) moveY += speed;
   else moveY -= speed;

   for(let i = 0 ; i < getHeight()/gridSize ; i++) {
      const y = i*gridSize + moveY
      ctx.beginPath();
      if(moveY < 0) {
         moveY += gridSize;
         ctx.fillRect(0, y + gridSize, getWidth(), 1)
      }
      else if(moveY < gridSize) {
         ctx.fillRect(0, y, getWidth(), 1);
      }
      else {
         moveY -= gridSize;
         ctx.fillRect(0, y - gridSize, getWidth(), 1)
      };
      ctx.closePath();
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
   ctx.beginPath();
   ctx.arc(getWidth()/2, getHeight()/2, playerRadius, 0, 360);
   ctx.fillStyle = 'lightblue';
   ctx.fill();
   ctx.closePath();
};

const rand = (min, max) => {
   min = parseInt(min, 10);
   max = parseInt(max, 10);
   if(min > max) {
      let tmp = min;
      min = max;
      max = tmp;
   };
   return Math.floor(Math.random() * (max - min + 1) + min);
};

const isEatable = (i) => {
   const x = getWidth()/2 - foodCoordsX[i];
   const y = getHeight()/2 - foodCoordsY[i];
   const distance = Math.sqrt(x*x + y*y);
   if(distance < playerRadius) return(true)
   else return(false);
};

const isOnCanvas = (i) => {
   const x = foodCoordsX[i];
   const y = foodCoordsY[i];
   if(x - 5 < 0 || x + 5 > getWidth()) return(false);
   else if(y - 5 < 0 || y + 5 > getHeight()) return(false);
   else return(true);
};
                                                                                                                               const isMagic = () => { if(playerRadius > getHeight()/2 && playerRadius > getWidth()/2) location.replace('https://www.youtube.com/watch?v=LLFhKaqnWwk'); };
const checkFood = () => {
   for(let i = 0 ; i < maxFoodAmount ; i++) {
      if(isOnCanvas(i) == 0) {
         addFood(i);
      }
      else if(isEatable(i) == 1) {
         addFood(i);
         playerRadius++;
         isMagic();
      }
   };
};

const moveFood = () => {
   const speedX = Math.floor(shareOfSpeed(mouseX) * getSpeed());
   const speedY = Math.floor(shareOfSpeed(mouseY) * getSpeed());
   for(let i = 0 ; i < maxFoodAmount ; i++) {
      if(mouseX > 0) {
         foodCoordsX[i] -= speedX;
      }
      else {
         foodCoordsX[i] += speedX;
      };

      if(mouseY > 0) {
         foodCoordsY[i] += speedY;
      }
      else {
         foodCoordsY[i] -= speedY;
      };
   };
};

const addFood = (i) => {
   foodCoordsX[i] = rand(0, getWidth());
   foodCoordsY[i] = rand(0, getHeight());
};

const starterPackFood = () => {
   const initialX = -20;
   const initialY = -20;
   for(let i = 0; i < maxFoodAmount; i++) {
      foodCoordsX.push(initialX);
      foodCoordsY.push(initialY);
      addFood();
   };
};

const drawFood = () => {
   for(let i = 0 ; i < maxFoodAmount ; i++) {
      ctx.beginPath();
      ctx.arc(foodCoordsX[i], foodCoordsY[i], 5, 0, 360);
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.closePath();
   };
};

const food = () => {
moveFood();
checkFood();
drawFood();
};

const game = () => {
   grid();
   food();
   player();
};

const start = () => {
   setCanvasDimensions();
   grid();
   starterPackFood();
   drawFood();
   player();
};

let playerRadius = 20;

let mouseX = 0;
let moveX = 30;

let mouseY = 0;
let moveY = 50;

const foodCoordsX = [];
const foodCoordsY = [];

const maxFoodAmount = 10;

setTimeout(start(), 10);

setTimeout(setInterval(game, 1000/60), 1000);
