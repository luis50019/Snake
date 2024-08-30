const canvas = document.querySelector('canvas');
const punctuation = document.getElementById('punctuation')
//buttons for the game
const btnUP = document.getElementById('btn-up')
const btnLeft = document.getElementById('btn-left')
const btnRight = document.getElementById('btn-right')
const btnDown = document.getElementById('btn-down')

//elementos del modal
const modal_score = document.getElementById('modal-score')
const btnPlay = document.getElementById('btn-play')
const modal = document.getElementById('modal')
window.localStorage.setItem('game', 'stop')

//form
const form = document.getElementById('form')
const inputUserName = document.getElementById('inputUserName')
const inputPassword = document.getElementById('inputPassword')
const error_userName = document.getElementById('error_userName')
const error_password = document.getElementById('error_password')
const error ={
  'error_userName':true,
  'error_password':true
}
import { validateUserName,validatePassword,singUpPlayer} from "./form.js";
import {getRankingPlayers, updateRecordPlayer} from './ranking.js'
inputUserName.addEventListener('keyup',(e)=>{
  validateUserName(e.target.value)
  .then(res => {
    error_userName.classList.replace('error_message','message_succeful');
    error_userName.innerHTML = res
    error.error_userName = false
  })
  .catch(e => {
    error_userName.classList.replace('message_succeful', 'error_message');
    error_userName.innerHTML = e
    error.error_userName = true
  })

})
inputPassword.addEventListener('keyup',(e)=>{
  validatePassword(e.target.value)
  .then(res => {
    error_password.classList.replace('error_message','message_succeful');
    error_password.innerHTML = res
    error.error_password = false
  })
  .catch(e =>{
    error_password.classList.replace('message_succeful', 'error_message');
    error_password.innerHTML = e
    error.error_password = true
  })
})

form.addEventListener('submit',(e)=>{
  e.preventDefault()
  if(error.error_userName || error.error_password){
    return
  }
  singUpPlayer(inputUserName.value,inputPassword.value)
  return 
})
//create the context 
const ctx = canvas.getContext('2d');
// Variables de los controles
let nextDirection = ''
// Inicializamos el tamaño de cada cuadro de la pantalla
const BLOCK_SIZE = 15; // Tamaño de cada bloque en píxeles
const BLOCK_HEIGHT = 17; // Número de bloques en altura
const BLOCK_WIDTH = 17; // Número de bloques en ancho

canvas.width = BLOCK_WIDTH * BLOCK_SIZE; // Ancho total en píxeles
canvas.height = BLOCK_HEIGHT * BLOCK_SIZE; // Altura total en píxeles
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
const board = Array.from({ length: BLOCK_HEIGHT }, () => Array(BLOCK_WIDTH).fill(0));

// VARIABLES DE LA SERPIENTE
const speedSnake = 1; // Velocidad de la serpiente
var apple = {
  "x": 5,
  "y": 5,
  "count": 0
}
var snake = [
  { "y": 12, "x": 1 },
  { "y": 13, "x": 1 },
  { "y": 14, "x": 1 }
];
function resetGame() {

  snake = [
    { "y": 12, "x": 1 },
    { "y": 13, "x": 1 },
    { "y": 14, "x": 1 }
  ];
  nextDirection = '';
  window.localStorage.setItem('game','play')
  drawApple(true)
  gameLoop()
}
function snakeEating() {
  const head = { ...snake[0] };

  if (
    head.x == apple.x &&
    head.y == apple.y
  ) {
    if (nextDirection === "ArrowUp") {
      head.y -= speedSnake;
    } else if (nextDirection === "ArrowLeft") {
      head.x -= speedSnake
    } else if (nextDirection === "ArrowRight") {
      head.x += speedSnake;
    } else if (nextDirection === "ArrowDown") {
      head.y += speedSnake;
    }
    snake.unshift(head)
    return true;
  }
  return false;
}

function drawApple(calculatePosition = false) {
  let eatingApple = snakeEating()
  if (eatingApple || calculatePosition) {
    const random_x = Math.floor((Math.random()) * BLOCK_WIDTH);
    const random_y = Math.floor((Math.random()) * BLOCK_HEIGHT);
    apple.x = random_x;
    apple.y = random_y
  }
  if(eatingApple){
    apple.count ++
  }
  ctx.beginPath()//indicamos que vamos a comenzar a dibujar
  ctx.fillStyle = '#6f7c41'
  ctx.arc(apple.x + .5, apple.y + .5, .3, 0, Math.PI * 2) //indicamos que sera un circulo
  ctx.fill()
  ctx.closePath() //evita mezclar trasados

}

function drawBoard() {
  const color1 = '#a8c945'; // cuadros oscuros
  const color2 = '#a4c542'
  ctx.fillStyle = color1;
  board.forEach((rows, y) => {
    rows.forEach((value, x) => {
      ctx.fillStyle = color2
      ctx.fillRect(x, y, 1, 1);
    });
  });
}

function drawSnake() {
  const color1 = "#4e5e47";
  snake.forEach(({ y, x }) => {
    ctx.fillStyle = color1;
    ctx.fillRect(x, y, 1, 1)

  })
}
// Definir las funciones manejadoras
const handleUp = () => {
  if (nextDirection !== 'ArrowDown') {
    nextDirection = 'ArrowUp';
  }
};

const handleDown = () => {
  if (nextDirection !== 'ArrowUp') {
    nextDirection = 'ArrowDown';
  }
};

const handleLeft = () => {
  if (nextDirection !== 'ArrowRight') {
    nextDirection = 'ArrowLeft';
  }
};

const handleRight = () => {
  if (nextDirection !== 'ArrowLeft') {
    nextDirection = 'ArrowRight';
  }
};
const handleKeyDown = event => {
  const { key } = event;

  if (key === "ArrowUp" && nextDirection != "ArrowDown") {
    nextDirection = "ArrowUp"
  } else if (key === "ArrowLeft" && nextDirection != "ArrowRight") {
    nextDirection = "ArrowLeft"
  } else if (key === "ArrowRight" && nextDirection != "ArrowLeft") {
    nextDirection = "ArrowRight"
  } else if (key === "ArrowDown" && nextDirection != "ArrowUp") {
    nextDirection = "ArrowDown"
  }
}

// Añadir los eventos
function initialEvents() {
  btnUP.addEventListener('click', handleUp);
  btnDown.addEventListener('click', handleDown);
  btnLeft.addEventListener('click', handleLeft);
  btnRight.addEventListener('click', handleRight);
  document.addEventListener('keydown', handleKeyDown);
  btnPlay.addEventListener('click', () => {
    modal.classList.add('not-active');
    apple.count = 0
    window.localStorage.setItem('game','refresh')
  });
}

// Desactivar los eventos
function removeButtonEvents() {
  btnUP.removeEventListener('click', handleUp);
  btnDown.removeEventListener('click', handleDown);
  btnLeft.removeEventListener('click', handleLeft);
  btnRight.removeEventListener('click', handleRight);
  document.removeEventListener('keydown', handleKeyDown)
}

function snakeMovement() {
  let snakeRuning = false;
  const head = { ...snake[0] } //copiar la cabeza
  const bodySnake = snake.slice(1, snake.length - 1);
  const headCollapse = bodySnake.some((body) => body.x == (head.x) && body.y == head.y)

  if (nextDirection === "ArrowUp" && head.y > -1) {
    head.y -= speedSnake;
    snakeRuning = true;
  } else if (nextDirection === "ArrowLeft" && head.x > -1) {
    head.x -= speedSnake
    snakeRuning = true;
  } else if (nextDirection === "ArrowRight" && head.x < (BLOCK_WIDTH - 1)) {
    head.x += speedSnake;
    snakeRuning = true;
  } else if (nextDirection === "ArrowDown" && head.y < (BLOCK_HEIGHT - 1)) {
    head.y += speedSnake;
    snakeRuning = true;
  }
  if (headCollapse || !snakeRuning) {
    updateRecordPlayer(apple.count)
    modal.classList.remove('not-active')
    removeButtonEvents()
    modal_score.innerHTML = "Score: " + apple.count
  }
  if (!snakeEating()) {
    snake.unshift(head);
    snake.pop()
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);//Limpia el canvas
  drawBoard();
  drawApple();
  drawSnake();
  if (nextDirection) {
    snakeMovement();
  }
}

function gameLoop() {

  punctuation.innerHTML = `Score: ${apple.count}`
  draw()
}
initialEvents()
setInterval(() => {
  if (window.localStorage.getItem('game') == 'play') {
    gameLoop()
  }
  if (window.localStorage.getItem('game') == 'refresh') {
    resetGame()
  }
  initialEvents()
}, 100)
