//npx browser-sync start -s ./ -w *
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const getWidth = () => window.innerWidth - 4;
const getHeight = () => window.innerHeight - 4;

const setCanvasDimensions = () => {
   canvas.width = getWidth();
   canvas.height = getHeight();
};

const playerPosition = (move) => {
   
}

window.addEventListener('resize', () => {
   setCanvasDimensions();
   grid();
   player();
   food();
});

window.addEventListener('mousemove', playerPosition);

drawGridVertical = (gridSize) => {
   for(let i = 0 ; i < getWidth()/gridSize ; i++){
      ctx.fillRect(i*gridSize, 0, 1, getHeight())
   };
};

drawGridHorizontal = (gridSize) => {
   for(let i = 0 ; i < getHeight()/gridSize ; i++){
      ctx.fillRect(0, i*gridSize, getWidth(), 1)
   };
};


const grid = () => {
   gridSize = 50;
   ctx.fillStyle = 'lightgrey';
   drawGridVertical(gridSize);
   drawGridHorizontal(gridSize);
};

const player = () => {
   ctx.fillStyle = 'blue';
   ctx.ellipse(getWidth()/2-playerRadius, getHeight/2, playerRadius, playerRadius, 0, 0, 360);
};

const food = () => {

};

Starterfood = () => {
   food();
};

const game = () => {
   grid();
   player();
   food();
};

let playerRadius = 50;

setCanvasDimensions();
grid();
player();
Starterfood();

setInterval(game, 1000/60)