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
   const speed = C(mouseX*mouseX + mouseY*mouseY);

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

      if(moveX <= 0) {
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
   };
};

const drawGridVertical = (gridSize) => { 
   const speed = shareOfSpeed(mouseY) * getSpeed();
   if(mouseY > 0 ) moveY += speed;
   else moveY -= speed;

   for(let i = 0 ; i < getHeight()/gridSize ; i++) {
      const y = i*gridSize + moveY

      if(moveY <= 0) {
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
   const x = getWidth()/2 - foodCoords[i][0];
   const y = getHeight()/2 - foodCoords[i][1];
   const distance = Math.sqrt(Math.pow(x) + Math.pow(y));
   if(distance < playerRadius + 5) return(true);
   else return(false);
};

const isOnCanvas = (i) => {
   const x = foodCoords[i][0];
   const y = foodCoords[i][1];
   if(x - 5 < 0 || x + 5 > getWidth || y - 5 < 0 || y + 5 > getHeight()) return(false);
   else return(true);
};

const addFood = (i) => {
   while(isOnCanvas(i) == 0 && isEatable(i) == 1) {
      foodCoords[i][0] = rand(0, getWidth);
      foodCoords[i][1] = rand(0, getHeight);
   }
};

const checkFood = () => {
   for(let i = 0 ; i <= foodCoords.length ; i++) {
      if(isEatable(i) == 1) {
         addFood(i);
         playerRadius++;
      }
      else if(isOnCanvas(i) == 0) {
         addFood(i);
      };
   };
};

const moveFood = () => {
   const speedX = shareOfSpeed(mouseX) * getSpeed();
   const speedY = shareOfSpeed(mouseY) * getSpeed();
   for(let i = 0 ; i <= foodCoords.length ; i++) {
      foodCoords[i][0] += speedX;
      foodCoords[i][1] += speedY;
   };
};

const starterPackFood = () => {
   const maxFoodAmount = 20;
   for(let i = 0; i < maxFoodAmount; i++) {
      addFood(i);
   };
};

const drawFood = () => {
   for(let i = 0 ; i <= foodCoords.length ; i++) {

   };
};

const food = () => {
moveFood();
checkFood();
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

const foodCoords = [];

setCanvasDimensions();
grid();
player();
starterPackFood();
drawFood();

setInterval(game, 1000/60)